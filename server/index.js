require('dotenv').config()
const express    = require('express')
const cors       = require('cors')
const nodemailer = require('nodemailer')

const app  = express()
const PORT = process.env.PORT || 3001

const allowedOrigins = [
  'http://localhost:5173',
  process.env.CLIENT_URL,
].filter(Boolean)

app.use(cors({ origin: allowedOrigins }))
app.use(express.json())

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
})

app.post('/api/contact', async (req, res) => {
  const { name, email, subject, message } = req.body

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required.' })
  }

  try {
    await transporter.sendMail({
      from:    `"CocoSense Contact" <${process.env.GMAIL_USER}>`,
      to:      process.env.RECIPIENT_EMAIL,
      replyTo: email,
      subject: `CocoSense Contact: ${subject}`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:auto;padding:32px;border:1px solid #e5e7eb;border-radius:12px;">
          <h2 style="color:#16a34a;margin-top:0;">New Contact Message</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#6b7280;width:90px;font-size:13px;">Name</td>
                <td style="padding:8px 0;font-weight:600;font-size:14px;">${name}</td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Email</td>
                <td style="padding:8px 0;font-size:14px;"><a href="mailto:${email}" style="color:#16a34a;">${email}</a></td></tr>
            <tr><td style="padding:8px 0;color:#6b7280;font-size:13px;">Subject</td>
                <td style="padding:8px 0;font-weight:600;font-size:14px;">${subject}</td></tr>
          </table>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;">
          <p style="color:#6b7280;font-size:13px;margin-bottom:8px;">Message</p>
          <p style="white-space:pre-wrap;font-size:14px;color:#111827;line-height:1.6;">${message}</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;">
          <p style="color:#9ca3af;font-size:12px;text-align:center;">CocoSense · SLIIT Faculty of Computing · Group 25-26J-384</p>
        </div>
      `,
    })

    res.json({ success: true })
  } catch (err) {
    console.error('Mail error:', err.message)
    res.status(500).json({ error: 'Failed to send email.' })
  }
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
