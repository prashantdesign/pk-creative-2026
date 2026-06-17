'use server';

import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().min(1, { message: 'Name is required.' }),
  email: z.string().email({ message: 'A valid email is required.' }),
  message: z.string().min(1, { message: 'Message is required.' }),
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
  });

  if (!parsed.success) {
    return {
      message: parsed.error.errors.map((e) => e.message).join(', '),
      error: true,
    };
  }

  const { name, email, message } = parsed.data;

  // Use the Firestore REST API to avoid server-side SDK initialization issues.
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const collectionId = 'contactMessages';
  
  if (!projectId) {
     const errorMessage = 'Firebase Project ID is not configured on the server.';
     console.error(errorMessage);
     return { message: 'Server configuration error. Please contact support.', error: true };
  }

  // The REST API automatically uses the service account credentials in this environment.
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
        console.error('Firestore REST API Error:', errorBody);
        const errorMessage = errorBody.error?.message || 'Failed to save message to the database.';
        return { message: `A server error occurred: ${errorMessage}`, error: true };
    }
    
    return { message: 'Thank you for your message! I will get back to you soon.' };

  } catch (error) {
    console.error('Error submitting contact form via REST API:', error);
    return { message: 'Something went wrong. Please try again later.', error: true };
  }
}
