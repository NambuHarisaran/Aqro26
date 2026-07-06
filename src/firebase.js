/*
 * ──────────────────────────────────────────────────────────
 *  Firebase + EmailJS — lazy-loaded
 *
 *  Both SDKs are only needed when a form is actually submitted
 *  (Contact page, TimeWallet delete-account page), so they are
 *  dynamic-imported here and stay out of the main bundle.
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

const EMAILJS_SERVICE = import.meta.env.VITE_EMAILJS_SERVICE_ID
const EMAILJS_PUBLIC = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

let dbPromise = null

async function getDb() {
  if (!dbPromise) {
    dbPromise = (async () => {
      const [{ initializeApp, getApps }, { getFirestore }] = await Promise.all([
        import('firebase/app'),
        import('firebase/firestore'),
      ])
      const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)
      return getFirestore(app)
    })()
  }
  return dbPromise
}

/**
 * Write a form submission to Firestore AND send an email via EmailJS.
 * @param {string} collectionName — e.g. 'contactSubmissions' or 'deletionRequests'
 * @param {object} data — form fields
 * @param {string} emailTemplateId — EmailJS template ID
 * @param {object} emailParams — template variables for EmailJS
 * @returns {Promise<string>} — the new Firestore document ID
 */
export async function submitForm(collectionName, data, emailTemplateId, emailParams) {
  const [db, { collection, addDoc, serverTimestamp }] = await Promise.all([
    getDb(),
    import('firebase/firestore'),
  ])

  // 1. Save to Firestore (backup / audit trail)
  const docRef = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
    status: 'new',
  })

  // 2. Send email notification via EmailJS
  if (EMAILJS_SERVICE && emailTemplateId && EMAILJS_PUBLIC) {
    try {
      const { default: emailjs } = await import('@emailjs/browser')
      await emailjs.send(EMAILJS_SERVICE, emailTemplateId, emailParams, EMAILJS_PUBLIC)
    } catch (emailErr) {
      // Don't fail the whole submission if email fails — data is already in Firestore
      console.warn('EmailJS send failed (data still saved to Firestore):', emailErr)
    }
  }

  return docRef.id
}
