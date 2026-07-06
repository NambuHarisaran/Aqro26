import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore'
import emailjs from '@emailjs/browser'

/*
 * ──────────────────────────────────────────────────────────
 *  Firebase config
 * ──────────────────────────────────────────────────────────
 */

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FB_APP_ID,
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

/*
 * ──────────────────────────────────────────────────────────
 *  EmailJS config
 *
 *  1. Sign up free at https://www.emailjs.com/
 *  2. Add Gmail as an Email Service → copy the Service ID
 *  3. Create an email template → copy the Template ID
 *  4. Copy your Public Key from Account → General
 *  5. Add the values to your .env file
 * ──────────────────────────────────────────────────────────
 */

const EMAILJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_PUBLIC   = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

/**
 * Write a form submission to Firestore AND send an email via EmailJS.
 * @param {string} collectionName — e.g. 'contactSubmissions' or 'deletionRequests'
 * @param {object} data — form fields
 * @param {string} emailTemplateId — EmailJS template ID
 * @param {object} emailParams — template variables for EmailJS
 * @returns {Promise<string>} — the new Firestore document ID
 */
export async function submitForm(collectionName, data, emailTemplateId, emailParams) {
  // 1. Save to Firestore (backup / audit trail)
  const docRef = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
    status: 'new',
  })

  // 2. Send email notification via EmailJS
  if (EMAILJS_SERVICE && emailTemplateId && EMAILJS_PUBLIC) {
    try {
      await emailjs.send(EMAILJS_SERVICE, emailTemplateId, emailParams, EMAILJS_PUBLIC)
    } catch (emailErr) {
      // Don't fail the whole submission if email fails — data is already in Firestore
      console.warn('EmailJS send failed (data still saved to Firestore):', emailErr)
    }
  }

  return docRef.id
}

export { db }
