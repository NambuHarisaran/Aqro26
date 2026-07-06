/**
 * ──────────────────────────────────────────────────────────
 *  AQRO Studio — Firebase Cloud Functions
 *  Sends email notifications to aqrowallet@gmail.com
 *  when new form submissions appear in Firestore.
 *
 *  SETUP:
 *  1. cd functions && npm install
 *  2. Set email credentials:
 *     firebase functions:config:set
 *       email.user="aqrowallet@gmail.com"
 *       email.pass="YOUR_GMAIL_APP_PASSWORD"
 *
 *     (Generate an App Password at https://myaccount.google.com/apppasswords)
 *
 *  3. Deploy: firebase deploy --only functions
 * ──────────────────────────────────────────────────────────
 */

const { onDocumentCreated } = require('firebase-functions/v2/firestore')
const { initializeApp } = require('firebase-admin/app')
const { defineString } = require('firebase-functions/params')
const nodemailer = require('nodemailer')

initializeApp()

// ── Config params (set via firebase functions:config or .env) ──
const EMAIL_USER = defineString('EMAIL_USER', {
  description: 'Gmail address used to send emails',
  default: 'aqrowallet@gmail.com',
})
const EMAIL_PASS = defineString('EMAIL_PASS', {
  description: 'Gmail App Password (NOT your regular password)',
})

function createTransport() {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER.value(),
      pass: EMAIL_PASS.value(),
    },
  })
}

// ──────────────────────────────────────────────────────────
//  Contact form → email
// ──────────────────────────────────────────────────────────
exports.onContactSubmission = onDocumentCreated(
  'contactSubmissions/{docId}',
  async (event) => {
    const data = event.data?.data()
    if (!data) return

    const transporter = createTransport()

    const html = `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #f2a93b; margin-bottom: 24px;">🌟 New Project Enquiry</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 12px; font-weight: 600; color: #555; border-bottom: 1px solid #eee;">Name</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #eee;">${data.name || '—'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; font-weight: 600; color: #555; border-bottom: 1px solid #eee;">Email</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #eee;">
              <a href="mailto:${data.email}">${data.email || '—'}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; font-weight: 600; color: #555; border-bottom: 1px solid #eee;">Project Type</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #eee;">${data.projectType || '—'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; font-weight: 600; color: #555; border-bottom: 1px solid #eee;">Budget</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #eee;">${data.budget || '—'}</td>
          </tr>
        </table>
        <div style="margin-top: 20px; padding: 16px; background: #f9f9f9; border-radius: 8px;">
          <p style="margin: 0 0 8px; font-weight: 600; color: #555;">Message:</p>
          <p style="margin: 0; white-space: pre-wrap;">${data.message || '—'}</p>
        </div>
        <hr style="margin-top: 32px; border: none; border-top: 1px solid #eee;" />
        <p style="font-size: 12px; color: #999;">
          Submitted at ${data.createdAt?.toDate?.()?.toISOString?.() || 'unknown'} via aqro.in contact form
        </p>
      </div>
    `

    await transporter.sendMail({
      from: `"AQRO Studio" <${EMAIL_USER.value()}>`,
      to: 'aqrowallet@gmail.com',
      replyTo: data.email,
      subject: `🌟 New Enquiry: ${data.projectType} — ${data.name}`,
      html,
    })

    console.log(`✅ Contact email sent for doc ${event.params.docId}`)
  },
)

// ──────────────────────────────────────────────────────────
//  Account deletion request → email
// ──────────────────────────────────────────────────────────
exports.onDeletionRequest = onDocumentCreated(
  'deletionRequests/{docId}',
  async (event) => {
    const data = event.data?.data()
    if (!data) return

    const transporter = createTransport()

    const html = `
      <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ef4444; margin-bottom: 24px;">🗑️ Account Deletion Request</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 12px; font-weight: 600; color: #555; border-bottom: 1px solid #eee;">App</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #eee;">${data.app || 'TimeWallet'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; font-weight: 600; color: #555; border-bottom: 1px solid #eee;">Email</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #eee;">
              <a href="mailto:${data.email}">${data.email || '—'}</a>
            </td>
          </tr>
          <tr>
            <td style="padding: 10px 12px; font-weight: 600; color: #555; border-bottom: 1px solid #eee;">Reason</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #eee;">${data.reason || 'Not specified'}</td>
          </tr>
        </table>
        ${
          data.details
            ? `
        <div style="margin-top: 20px; padding: 16px; background: #fff5f5; border-radius: 8px; border-left: 4px solid #ef4444;">
          <p style="margin: 0 0 8px; font-weight: 600; color: #555;">Additional Details:</p>
          <p style="margin: 0; white-space: pre-wrap;">${data.details}</p>
        </div>`
            : ''
        }
        <div style="margin-top: 24px; padding: 16px; background: #fffbeb; border-radius: 8px; border-left: 4px solid #f59e0b;">
          <p style="margin: 0; font-weight: 600; color: #92400e;">⚠️ Action Required</p>
          <p style="margin: 8px 0 0; color: #78350f; font-size: 14px;">
            Process this deletion within 7 business days and confirm with the user at ${data.email}.
          </p>
        </div>
        <hr style="margin-top: 32px; border: none; border-top: 1px solid #eee;" />
        <p style="font-size: 12px; color: #999;">
          Submitted at ${data.createdAt?.toDate?.()?.toISOString?.() || 'unknown'} via aqro.in account deletion form
        </p>
      </div>
    `

    await transporter.sendMail({
      from: `"AQRO Studio" <${EMAIL_USER.value()}>`,
      to: 'aqrowallet@gmail.com',
      replyTo: data.email,
      subject: `🗑️ Account Deletion Request — ${data.app} — ${data.email}`,
      html,
    })

    console.log(`✅ Deletion request email sent for doc ${event.params.docId}`)
  },
)
