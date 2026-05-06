import { useState, useRef } from 'react'
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { useInView } from '../hooks/useInView'

const API_URL = import.meta.env.DEV
  ? 'http://localhost:3001/api/contact'
  : '/api/contact'

const contactInfo = [
  {
    icon: <Mail size={18} />,
    label: 'Email',
    value: 'cocosense@sliit.lk',
    href: 'mailto:cocosense@sliit.lk',
    color: 'green',
  },
  {
    icon: <MapPin size={18} />,
    label: 'Location',
    value: 'SLIIT, New Kandy Rd, Malabe, Sri Lanka',
    href: 'https://maps.google.com/?q=SLIIT+Malabe',
    color: 'blue',
  },
  {
    icon: <Phone size={18} />,
    label: 'Phone',
    value: '+94 11 413 5000',
    href: 'tel:+94114135000',
    color: 'orange',
  },
]

const palette = {
  green:  { wrap: 'bg-green-50 dark:bg-green-500/10 border-green-100 dark:border-green-500/20 text-green-600 dark:text-green-400' },
  blue:   { wrap: 'bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20 text-blue-600 dark:text-blue-400' },
  orange: { wrap: 'bg-orange-50 dark:bg-orange-500/10 border-orange-100 dark:border-orange-500/20 text-orange-600 dark:text-orange-400' },
}

function ContactCard({ item, index }) {
  const [ref, inView] = useInView()
  return (
    <a ref={ref} href={item.href} target="_blank" rel="noreferrer"
      className={`card card-hover rounded-2xl p-6 flex items-start gap-4 group transition-all duration-300
        ${inView ? 'anim-fade-up' : 'opacity-0'}`}
      style={{ animationDelay: `${index * 100}ms` }}>
      <div className={`w-11 h-11 rounded-xl border flex items-center justify-center flex-shrink-0 transition-all duration-200
        group-hover:scale-110 ${palette[item.color].wrap}`}>
        {item.icon}
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-1">{item.label}</p>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
          {item.value}
        </p>
      </div>
    </a>
  )
}

export default function Contact() {
  const formRef = useRef(null)
  const [titleRef, titleInView] = useInView()

  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (status === 'sending') return
    setStatus('sending')

    try {
      const res = await fetch(API_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div ref={titleRef} className={`text-center mb-16 ${titleInView ? 'anim-fade-up' : 'opacity-0'}`}>
          <span className="inline-block px-3 py-1 rounded-full bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400
            text-xs font-bold uppercase tracking-widest mb-4 border border-green-100 dark:border-green-500/20">
            Contact Us
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 leading-tight">
            Get in <span className="text-green-500">Touch</span>
          </h1>
          <p className="text-base text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
            Have questions about CocoSense? We'd love to hear from you. Send us a message
            and our team will get back to you as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Left – contact info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {contactInfo.map((item, i) => (
              <ContactCard key={item.label} item={item} index={i} />
            ))}

            {/* Map embed */}
            <div className="rounded-2xl overflow-hidden border border-gray-100 dark:border-white/8 flex-1 min-h-48">
              <iframe
                title="SLIIT Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.0!2d79.9705!3d6.9146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae256db1a6771c5%3A0x2c63e344ab9a7536!2sSLIIT!5e0!3m2!1sen!2slk!4v1700000000000!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '192px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Right – contact form */}
          <div className="lg:col-span-3">
            <div className="card rounded-2xl p-8">
              <h2 className="text-xl font-black text-gray-900 dark:text-white mb-6">Send a Message</h2>

              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-50 dark:bg-green-500/10 flex items-center justify-center text-green-500">
                    <CheckCircle size={32} />
                  </div>
                  <p className="text-xl font-black text-gray-900 dark:text-white">Message Sent!</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Thank you for reaching out. We'll get back to you soon.
                  </p>
                  <button onClick={() => setStatus('idle')}
                    className="mt-2 px-5 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white text-sm font-semibold transition-all hover:scale-105">
                    Send Another
                  </button>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">

                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">
                        Your Name
                      </label>
                      <input
                        type="text" name="name" required value={form.name} onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-gray-600
                          bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10
                          focus:outline-none focus:border-green-400 dark:focus:border-green-500 focus:bg-white dark:focus:bg-white/8
                          transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">
                        Email Address
                      </label>
                      <input
                        type="email" name="email" required value={form.email} onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-gray-600
                          bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10
                          focus:outline-none focus:border-green-400 dark:focus:border-green-500 focus:bg-white dark:focus:bg-white/8
                          transition-all duration-200"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">
                      Subject
                    </label>
                    <input
                      type="text" name="subject" required value={form.subject} onChange={handleChange}
                      placeholder="How can we help?"
                      className="w-full px-4 py-3 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-gray-600
                        bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10
                        focus:outline-none focus:border-green-400 dark:focus:border-green-500 focus:bg-white dark:focus:bg-white/8
                        transition-all duration-200"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-2">
                      Message
                    </label>
                    <textarea
                      name="message" required rows={6} value={form.message} onChange={handleChange}
                      placeholder="Tell us more about your inquiry..."
                      className="w-full px-4 py-3 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-300 dark:placeholder-gray-600
                        bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10
                        focus:outline-none focus:border-green-400 dark:focus:border-green-500 focus:bg-white dark:focus:bg-white/8
                        transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Error */}
                  {status === 'error' && (
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20
                      text-red-600 dark:text-red-400 text-sm">
                      <AlertCircle size={16} />
                      Failed to send. Please try again or email us directly.
                    </div>
                  )}

                  {/* Submit */}
                  <button type="submit" disabled={status === 'sending'}
                    className="self-end flex items-center gap-2 px-7 py-3 rounded-xl bg-green-600 hover:bg-green-500 disabled:opacity-60
                      text-white font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-green-500/20">
                    {status === 'sending' ? (
                      <>
                        <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        Send Message
                      </>
                    )}
                  </button>

                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
