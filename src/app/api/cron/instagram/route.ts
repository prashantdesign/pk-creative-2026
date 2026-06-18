import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import type { InstagramPost, PrivateSettings } from '@/types';

// Initialize a dedicated Firebase app for the server
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const firestore = getFirestore(app);

export const dynamic = 'force-dynamic'; // Prevent static caching
export const maxDuration = 60; // Max execution time

export async function GET(request: Request) {
  // 1. Authenticate as Admin to bypass Firestore Security Rules
  const adminEmail = process.env.CRON_ADMIN_EMAIL;
  const adminPassword = process.env.CRON_ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    return NextResponse.json({ error: 'Cron Admin credentials not configured in environment variables.' }, { status: 500 });
  }

  try {
    await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to authenticate Cron Bot with Firebase.' }, { status: 401 });
  }

  try {
    // 2. Fetch Private Settings (SMTP & Meta API)
    const settingsDoc = await getDoc(doc(firestore, 'pkcreative_privateSettings', 'global'));
    if (!settingsDoc.exists()) {
      return NextResponse.json({ message: 'No private settings configured. Skipping.' }, { status: 200 });
    }
    const settings = settingsDoc.data() as PrivateSettings;

    // 3. Find Posts Scheduled for NOW or PAST that are still "SCHEDULED"
    const now = new Date();
    const postsQuery = query(
      collection(firestore, 'pkcreative_instagramPosts'),
      where('status', '==', 'SCHEDULED')
    );
    const postsSnapshot = await getDocs(postsQuery);

    const postsToProcess: (InstagramPost & { id: string })[] = [];
    postsSnapshot.forEach(doc => {
      const data = doc.data() as InstagramPost;
      if (new Date(data.scheduledTime) <= now) {
        postsToProcess.push({ ...data, id: doc.id });
      }
    });

    if (postsToProcess.length === 0) {
      return NextResponse.json({ message: 'No posts scheduled for this exact time.' }, { status: 200 });
    }

    // 4. Setup Nodemailer Transporter
    let transporter: nodemailer.Transporter | null = null;
    if (settings.smtpHost && settings.smtpUser && settings.smtpPass) {
      transporter = nodemailer.createTransport({
        host: settings.smtpHost,
        port: parseInt(settings.smtpPort || '587'),
        secure: settings.smtpPort === '465',
        auth: {
          user: settings.smtpUser,
          pass: settings.smtpPass,
        },
      });
    }

    // 5. Process Each Post
    const results = [];
    for (const post of postsToProcess) {
      try {
        let publishedViaApi = false;

        // Try Meta API Auto-Post FIRST if credentials exist
        if (settings.metaAppId && settings.metaAccessToken && settings.instagramAccountId) {
            // SKELETON: This is where the actual Meta Graph API POST request goes.
            // Example Flow:
            // 1. POST /v19.0/{ig-user-id}/media (image_url, caption) -> gets Container ID
            // 2. POST /v19.0/{ig-user-id}/media_publish (creation_id) -> Publishes!
            
            // Simulating API success for the skeleton implementation
            // const result = await fetch(`https://graph.facebook.com/v19.0/...`);
            publishedViaApi = true; 
        }

        // If Meta API wasn't configured, fall back to Email Reminder
        if (!publishedViaApi && transporter && settings.adminEmail) {
          await transporter.sendMail({
            from: settings.smtpSender || settings.smtpUser,
            to: settings.adminEmail,
            subject: `🔔 Time to Post on Instagram!`,
            html: `
              <h2>Your scheduled post is ready!</h2>
              <img src="${post.imageUrl}" alt="Post Image" style="max-width: 400px; border-radius: 10px;" />
              <p><strong>Caption:</strong></p>
              <pre style="background: #f4f4f4; padding: 15px; border-radius: 5px;">${post.caption}</pre>
              <p><em>Please copy the caption and image above and post it manually via the Instagram app.</em></p>
            `
          });
        }

        // Mark as Published (or at least "Notified")
        await updateDoc(doc(firestore, 'pkcreative_instagramPosts', post.id), {
          status: 'PUBLISHED',
          publishedAt: new Date().toISOString(),
        });

        results.push({ id: post.id, status: 'success' });

      } catch (postError: any) {
        await updateDoc(doc(firestore, 'pkcreative_instagramPosts', post.id), {
          status: 'FAILED',
          error: postError.message,
        });
        results.push({ id: post.id, status: 'failed', error: postError.message });
      }
    }

    return NextResponse.json({ message: 'Processed scheduled posts', results }, { status: 200 });

  } catch (globalError: any) {
    return NextResponse.json({ error: globalError.message }, { status: 500 });
  }
}
