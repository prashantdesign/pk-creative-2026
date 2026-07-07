'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';

const contactSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  email: z.string().email({ message: 'A valid email is required.' }),
  message: z.string().min(1, { message: 'Message is required.' }),
  services: z.string().optional(),
  phone: z.string().optional(),
});

export type FormState = {
  message: string;
  error?: boolean;
};

async function fetchBranding(projectId: string) {
  let logoUrl = '';
  let siteName = 'PK Creative';
  try {
    const siteContentUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/pkcreative_siteContent/global`;
    const response = await fetch(siteContentUrl);
    if (response.ok) {
      const data = await response.json();
      logoUrl = data.fields?.logoUrl?.stringValue || '';
      siteName = data.fields?.siteName?.stringValue || 'PK Creative';
    }
  } catch (error) {
    console.error("Failed to fetch branding for emails:", error);
  }
  return { logoUrl, siteName };
}

export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
    services: formData.get('services'),
    phone: formData.get('phone'),
  });

  if (!parsed.success) {
    return {
      message: parsed.error.errors.map((e) => e.message).join(', '),
      error: true,
    };
  }

  const { name, email, message, services: servicesString, phone } = parsed.data;
  
  let servicesArray: string[] = [];
  try {
      if (servicesString) {
          servicesArray = JSON.parse(servicesString);
      }
  } catch(e) {}

  // Use the Firestore REST API to avoid server-side SDK initialization issues.
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const collectionId = 'pkcreative_contactMessages';
  
  if (!projectId) {
     return { message: 'Server configuration error. Please contact support.', error: true };
  }

  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${collectionId}`;
  const now = new Date().toISOString();

  // Structure the document according to the REST API format.
  const firestoreDocument = {
    fields: {
      name: { stringValue: name },
      email: { stringValue: email },
      message: { stringValue: message },
      isRead: { booleanValue: false },
      timestamp: { timestampValue: now },
      ...(phone && { phone: { stringValue: phone } }),
      ...(servicesArray.length > 0 && {
          services: {
              arrayValue: {
                  values: servicesArray.map(s => ({ stringValue: s }))
              }
          }
      })
    },
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(firestoreDocument),
    });
    
    if (!response.ok) {
        const errorBody = await response.json();
        return { message: `A server error occurred: ${errorBody.error?.message || 'Failed'}`, error: true };
    }
    
    // Attempt to send email notification using SMTP settings from Firestore
    try {
        let smtpHost = '';
        let smtpPort = '587';
        let smtpUser = '';
        let smtpPass = '';
        let smtpSender = '';
        let adminEmail = '';
        
        let loadedFromAdmin = false;

        // Try fetching via firebase-admin first (bypasses security rules in production GCP/Firebase App Hosting)
        try {
            const { initializeApp, getApps } = await import('firebase-admin/app');
            const { getFirestore } = await import('firebase-admin/firestore');
            
            const apps = getApps();
            const adminApp = apps.length === 0 ? initializeApp({ projectId }) : apps[0];
            const db = getFirestore(adminApp);
            const settingsSnap = await db.collection('pkcreative_privateSettings').doc('global').get();
            if (settingsSnap.exists) {
                const data = settingsSnap.data();
                if (data) {
                    smtpHost = data.smtpHost || '';
                    smtpPort = data.smtpPort || '587';
                    smtpUser = data.smtpUser || '';
                    smtpPass = data.smtpPass || '';
                    smtpSender = data.smtpSender || data.smtpUser || '';
                    adminEmail = data.adminEmail || data.smtpUser || '';
                    loadedFromAdmin = true;
                }
            }
        } catch (adminError) {
            console.warn("Firebase Admin SDK failed to load/fetch settings (normal in local dev):", adminError);
        }

        // Fallback to Firestore REST API (using OAuth2 metadata token if available)
        if (!loadedFromAdmin) {
            let gcpToken: string | null = null;
            try {
                const metadataResponse = await fetch('http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/token', {
                    headers: { 'Metadata-Flavor': 'Google' },
                    signal: AbortSignal.timeout(1000)
                });
                if (metadataResponse.ok) {
                    const tokenData = await metadataResponse.json();
                    gcpToken = tokenData.access_token;
                }
            } catch (metadataError) {
                // Silently ignore metadata server failures (e.g. running in local development)
            }

            const settingsUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/pkcreative_privateSettings/global`;
            const settingsResponse = await fetch(settingsUrl, {
                headers: {
                    ...(gcpToken ? { 'Authorization': `Bearer ${gcpToken}` } : {})
                }
            });

            if (settingsResponse.ok) {
                const settingsData = await settingsResponse.json();
                const fields = settingsData.fields;
                if (fields) {
                    smtpHost = fields.smtpHost?.stringValue || '';
                    smtpPort = fields.smtpPort?.stringValue || '587';
                    smtpUser = fields.smtpUser?.stringValue || '';
                    smtpPass = fields.smtpPass?.stringValue || '';
                    smtpSender = fields.smtpSender?.stringValue || fields.smtpUser?.stringValue || '';
                    adminEmail = fields.adminEmail?.stringValue || fields.smtpUser?.stringValue || '';
                }
            } else {
                console.error("Firestore REST API fallback returned error status:", settingsResponse.status);
            }
        }

        if (smtpHost && smtpUser && smtpPass) {
            const transporter = nodemailer.createTransport({
                host: smtpHost,
                port: parseInt(smtpPort),
                secure: smtpPort === '465',
                auth: {
                    user: smtpUser,
                    pass: smtpPass,
                }
            });

            const targetAdminEmail = adminEmail || smtpUser;
            const targetSenderEmail = smtpSender || smtpUser;

            const { logoUrl, siteName } = await fetchBranding(projectId);

            const mailOptions = {
                from: `"${name} via Website" <${targetSenderEmail}>`,
                to: targetAdminEmail,
                replyTo: email,
                subject: `New Contact Form Submission from ${name}`,
                html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Inquiry Received</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f5f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f4f5f7; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05); border: 1px solid #eef0f3;">
          <!-- Top Accent Line -->
          <tr>
            <td height="6" style="background: linear-gradient(to right, #612af5, #7c3aed);"></td>
          </tr>
          
          <!-- Header (Logo) -->
          <tr>
            <td align="center" style="padding: 32px 32px 24px 32px;">
              ${logoUrl ? `
                <img src="${logoUrl}" alt="${siteName}" style="max-height: 50px; width: auto; display: block;" />
              ` : `
                <span style="font-size: 24px; font-weight: bold; color: #1e1b4b; font-family: sans-serif;">${siteName}</span>
              `}
            </td>
          </tr>

          <!-- Heading -->
          <tr>
            <td align="center" style="padding: 0 32px 24px 32px; border-bottom: 1px solid #f0f1f4;">
              <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #1e1b4b; font-family: sans-serif;">New Inquiry Received</h1>
              <p style="margin: 8px 0 0 0; font-size: 14px; color: #64748b; font-family: sans-serif;">A visitor has submitted a new inquiry via the contact form.</p>
            </td>
          </tr>

          <!-- Details Table -->
          <tr>
            <td style="padding: 32px;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <!-- Name -->
                <tr>
                  <td width="30%" valign="top" style="padding-bottom: 16px; font-size: 14px; font-weight: 600; color: #475569; font-family: sans-serif;">Name:</td>
                  <td width="70%" valign="top" style="padding-bottom: 16px; font-size: 14px; color: #1e293b; font-family: sans-serif;">${name}</td>
                </tr>
                <!-- Email -->
                <tr>
                  <td width="30%" valign="top" style="padding-bottom: 16px; font-size: 14px; font-weight: 600; color: #475569; font-family: sans-serif;">Email:</td>
                  <td width="70%" valign="top" style="padding-bottom: 16px; font-size: 14px; color: #1e293b; font-family: sans-serif;">
                    <a href="mailto:${email}" style="color: #612af5; text-decoration: none;">${email}</a>
                  </td>
                </tr>
                <!-- Phone -->
                ${phone ? `
                <tr>
                  <td width="30%" valign="top" style="padding-bottom: 16px; font-size: 14px; font-weight: 600; color: #475569; font-family: sans-serif;">Phone:</td>
                  <td width="70%" valign="top" style="padding-bottom: 16px; font-size: 14px; color: #1e293b; font-family: sans-serif;">
                    <a href="tel:${phone}" style="color: #612af5; text-decoration: none;">${phone}</a>
                  </td>
                </tr>
                ` : ''}
                <!-- Services -->
                ${servicesArray.length > 0 ? `
                <tr>
                  <td width="30%" valign="top" style="padding-bottom: 16px; font-size: 14px; font-weight: 600; color: #475569; font-family: sans-serif;">Services:</td>
                  <td width="70%" valign="top" style="padding-bottom: 16px; font-size: 14px; color: #1e293b; font-family: sans-serif;">
                    ${servicesArray.map(s => `<span style="display: inline-block; background-color: #f1f5f9; color: #475569; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 500; margin-right: 6px; margin-bottom: 6px; font-family: sans-serif;">${s}</span>`).join('')}
                  </td>
                </tr>
                ` : ''}
                <!-- Message -->
                <tr>
                  <td colspan="2" valign="top" style="padding-top: 8px;">
                    <div style="font-size: 14px; font-weight: 600; color: #475569; margin-bottom: 8px; font-family: sans-serif;">Message:</div>
                    <div style="font-size: 14px; color: #334155; line-height: 1.6; background-color: #fafafc; padding: 16px; border-radius: 8px; border: 1px solid #f0f1f4; white-space: pre-wrap; font-family: sans-serif;">${message}</div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer Action Button -->
          <tr>
            <td align="center" style="padding: 0 32px 40px 32px;">
              <a href="https://pkcreative.in/pk-admin" target="_blank" style="display: inline-block; background-color: #612af5; color: #ffffff; padding: 14px 28px; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 8px; font-family: sans-serif;">
                Open Dashboard
              </a>
            </td>
          </tr>
        </table>
        
        <!-- Copyright Info -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin-top: 24px;">
          <tr>
            <td align="center" style="font-size: 12px; color: #94a3b8; line-height: 1.5; font-family: sans-serif;">
              &copy; ${new Date().getFullYear()} ${siteName}. All rights reserved.<br>
              This is an automated operational notification.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
            };

            await transporter.sendMail(mailOptions);
        } else {
            console.error("SMTP configurations are incomplete or failed to load. Mail not sent.");
        }
    } catch (emailError) {
        console.error("Email notification failed to send:", emailError);
    }

    return { message: 'Thank you for your message! I will get back to you soon.' };

  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { message: 'Something went wrong. Please try again later.', error: true };
  }
}

const replySchema = z.object({
  toEmail: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

export async function sendAdminReply(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = replySchema.safeParse({
    toEmail: formData.get('toEmail'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  });

  if (!parsed.success) {
    return {
      message: parsed.error.errors.map((e) => e.message).join(', '),
      error: true,
    };
  }

  const { toEmail, subject, message } = parsed.data;
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

  if (!projectId) {
     return { message: 'Server configuration error.', error: true };
  }

  const idToken = formData.get('idToken') as string;

  try {
      const settingsUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/pkcreative_privateSettings/global`;
      const settingsResponse = await fetch(settingsUrl, {
          headers: {
              ...(idToken ? { 'Authorization': `Bearer ${idToken}` } : {})
          }
      });
      
      if (!settingsResponse.ok) {
          return { message: `Failed to fetch SMTP settings. (Status ${settingsResponse.status})`, error: true };
      }
      
      const settingsData = await settingsResponse.json();
      const fields = settingsData.fields;
      
      if (!fields || !fields.smtpHost?.stringValue || !fields.smtpUser?.stringValue || !fields.smtpPass?.stringValue) {
          return { message: 'SMTP settings are not configured in the Admin Panel.', error: true };
      }

      const transporter = nodemailer.createTransport({
          host: fields.smtpHost.stringValue,
          port: parseInt(fields.smtpPort?.stringValue || '587'),
          secure: fields.smtpPort?.stringValue === '465',
          auth: {
              user: fields.smtpUser.stringValue,
              pass: fields.smtpPass.stringValue,
          }
      });

      const senderEmail = fields.smtpSender?.stringValue || fields.smtpUser.stringValue;

      const { logoUrl, siteName } = await fetchBranding(projectId);

      const mailOptions = {
          from: `"${fields.adminEmail?.stringValue || 'Admin'}" <${senderEmail}>`,
          to: toEmail,
          subject: subject,
          html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.03); border: 1px solid #e2e8f0;">
          <!-- Top Accent Line -->
          <tr>
            <td height="6" style="background: linear-gradient(to right, #612af5, #7c3aed);"></td>
          </tr>
          
          <!-- Header (Logo) -->
          <tr>
            <td align="left" style="padding: 32px 32px 20px 32px; border-bottom: 1px solid #f1f5f9;">
              ${logoUrl ? `
                <img src="${logoUrl}" alt="${siteName}" style="max-height: 40px; width: auto; display: block;" />
              ` : `
                <span style="font-size: 20px; font-weight: bold; color: #1e1b4b; font-family: sans-serif;">${siteName}</span>
              `}
            </td>
          </tr>

          <!-- Message Body -->
          <tr>
            <td style="padding: 32px; font-size: 16px; color: #334155; line-height: 1.7; font-family: sans-serif;">
              <p style="margin: 0 0 20px 0; font-family: sans-serif;">Hello,</p>
              <div style="white-space: pre-wrap; color: #1e293b; font-family: sans-serif;">${message}</div>
              
              <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #f1f5f9; font-family: sans-serif;">
                <p style="margin: 0; font-size: 14px; font-weight: 600; color: #475569; font-family: sans-serif;">Warm regards,</p>
                <p style="margin: 4px 0 0 0; font-size: 14px; font-weight: 700; color: #612af5; font-family: sans-serif;">${siteName} Team</p>
                <p style="margin: 4px 0 0 0; font-size: 12px; color: #94a3b8; font-family: sans-serif;"><a href="https://pkcreative.in" style="color: #94a3b8; text-decoration: none;">www.pkcreative.in</a></p>
              </div>
            </td>
          </tr>
        </table>
        
        <!-- Copyright Info -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; margin-top: 24px;">
          <tr>
            <td align="center" style="font-size: 12px; color: #94a3b8; line-height: 1.5; font-family: sans-serif;">
              &copy; ${new Date().getFullYear()} ${siteName}. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
          `
      };

      await transporter.sendMail(mailOptions);
      return { message: 'Reply sent successfully!' };

  } catch (error) {
      console.error("Failed to send admin reply:", error);
      return { message: 'Failed to send email. Check your SMTP settings.', error: true };
  }
}

