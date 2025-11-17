import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState({ state: 'idle', message: '' })
  const backend = import.meta.env.VITE_BACKEND_URL

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus({ state: 'loading', message: '' })
    try {
      const res = await fetch(`${backend}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Failed to send')
      setStatus({ state: 'success', message: 'Thanks — your message has been sent.' })
      setForm({ name: '', email: '', phone: '', message: '' })
    } catch (err) {
      setStatus({ state: 'error', message: err.message + ' — saved for follow-up.' })
    }
  }

  return (
    <section id="contact" className="bg-neutral-50">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900">Contact</h2>
        <div className="mt-10 grid md:grid-cols-2 gap-10">
          <form onSubmit={onSubmit} className="bg-white border border-neutral-200 rounded-xl p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-neutral-700">Name</label>
                <input name="name" value={form.name} onChange={onChange} className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-neutral-400" required />
              </div>
              <div>
                <label className="text-sm text-neutral-700">Email</label>
                <input name="email" type="email" value={form.email} onChange={onChange} className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-neutral-400" required />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm text-neutral-700">Phone</label>
                <input name="phone" value={form.phone} onChange={onChange} className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-neutral-400" placeholder="Optional" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-sm text-neutral-700">Message</label>
                <textarea name="message" rows="5" value={form.message} onChange={onChange} className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-neutral-400" placeholder="Tell me about the property and deliverables" required />
              </div>
            </div>
            <button disabled={status.state==='loading'} className="mt-6 inline-flex items-center rounded-full border border-neutral-300 px-6 py-3 text-neutral-900 hover:border-neutral-400 disabled:opacity-50">
              {status.state==='loading' ? 'Sending…' : 'Send Inquiry'}
            </button>
            {status.message && (
              <div className={`mt-3 text-sm ${status.state==='success' ? 'text-emerald-700' : status.state==='error' ? 'text-amber-700' : 'text-neutral-600'}`}>{status.message}</div>
            )}
          </form>

          <div className="space-y-6">
            <div className="p-6 rounded-xl border border-neutral-200 bg-white">
              <p className="text-sm text-neutral-600">Email</p>
              <a href="mailto:studio@example.com" className="block text-neutral-900 hover:underline">studio@example.com</a>
              <p className="mt-4 text-sm text-neutral-600">Phone</p>
              <a href="tel:+356000000" className="block text-neutral-900 hover:underline">+356 0000 0000</a>
              <div className="mt-6 text-sm text-neutral-600">Available across Malta.</div>
            </div>
            <div className="h-56 rounded-xl border border-neutral-200 bg-gradient-to-br from-neutral-100 to-neutral-50 flex items-center justify-center text-neutral-500">
              Map Placeholder
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
