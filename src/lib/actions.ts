'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';

const contactSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  email: z.string().email({ message: 'A valid email is required.' }),
  message: z.string().min(1, { message: 'Message is required.' }),
  services: z.string().optional(),
});

export type FormState = {
  message: string;
  error?: boolean;
};

export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const parsed = contactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
    services: formData.get('services'),
  });

  if (!parsed.success) {
    return {
      message: parsed.error.errors.map((e) => e.message).join(', '),
      error: true,
    };
  }

  const { name, email, message, services: servicesString } = parsed.data;
  
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
        // Fetch GCP service account access token from metadata server if available (timeout after 1s to not block local dev)
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
            if (fields && fields.smtpHost?.stringValue && fields.smtpUser?.stringValue && fields.smtpPass?.stringValue) {
                const transporter = nodemailer.createTransport({
                    host: fields.smtpHost.stringValue,
                    port: parseInt(fields.smtpPort?.stringValue || '587'),
                    secure: fields.smtpPort?.stringValue === '465',
                    auth: {
                        user: fields.smtpUser.stringValue,
                        pass: fields.smtpPass.stringValue,
                    }
                });

                const adminEmail = fields.adminEmail?.stringValue || fields.smtpUser.stringValue;
                const senderEmail = fields.smtpSender?.stringValue || fields.smtpUser.stringValue;

                const mailOptions = {
                    from: `"${name} via Website" <${senderEmail}>`,
                    to: adminEmail,
                    replyTo: email,
                    subject: `New Contact Form Submission from ${name}`,
                    html: `
                        <h2>New Contact Form Submission</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        ${servicesArray.length > 0 ? `<p><strong>Inquiring about:</strong> ${servicesArray.join(', ')}</p>` : ''}
                        <p><strong>Message:</strong></p>
                        <p style="white-space: pre-wrap;">${message}</p>
                    `
                };

                await transporter.sendMail(mailOptions);
            }
        } else {
            console.error("Firestore REST API returned error status:", settingsResponse.status);
        }
    } catch (emailError) {
        console.error("Email notification failed to send:", emailError);
        // We don't return an error to the user if the notification fails, since the message was saved.
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

      const mailOptions = {
          from: `"${fields.adminEmail?.stringValue || 'Admin'}" <${senderEmail}>`,
          to: toEmail,
          subject: subject,
          html: `<p style="white-space: pre-wrap;">${message}</p>`
      };

      await transporter.sendMail(mailOptions);
      return { message: 'Reply sent successfully!' };

  } catch (error) {
      console.error("Failed to send admin reply:", error);
      return { message: 'Failed to send email. Check your SMTP settings.', error: true };
  }
}

