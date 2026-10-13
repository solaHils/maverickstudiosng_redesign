import { useState, type FormEvent } from 'react'
import { Container, Heading, pillPrimary, subheading } from '../components/ui'
import { SITE } from '../data'

// Enquiries are posted to send-enquiry.php on the same host (see public/send-enquiry.php).
const ENDPOINT = (import.meta.env.VITE_FORM_ENDPOINT as string | undefined) ?? '/send-enquiry.php'
const TYPES = ['3D animation', 'VFX', 'Motion design', 'Other']

const field =
  'w-full rounded-[10px] bg-surface-1 border border-hairline px-[14px] py-[12px] text-[15px] text-white placeholder:text-ink-muted focus:border-brand focus:outline-none transition-colors'

export default function Contact() {
  const [type, setType] = useState(TYPES[0])
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const payload: Record<string, FormDataEntryValue> = {
      ...Object.fromEntries(new FormData(form)),
      projectType: type,
    }

    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error()
      setStatus('sent')
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="pt-40 pb-24">
      <Container className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <Heading as="h1">Contact</Heading>
          <h2 className={subheading}>Start a conversation.</h2>
          <p className="mt-4 max-w-md text-[15px] text-ink-muted">
            Have a world in mind? Tell us about the story, challenge or impossible thing you want to make real.
          </p>

          <dl className="mt-10 divide-y divide-hairline border-y border-hairline text-[16px]">
            <div className="py-4 flex justify-between gap-4">
              <dt className="text-ink-muted">Email</dt>
              <dd><a href={`mailto:${SITE.email}`} className="hover:text-brand">{SITE.email}</a></dd>
            </div>
            <div className="py-4 flex justify-between gap-4">
              <dt className="text-ink-muted">Phone</dt>
              <dd className="text-right">
                {SITE.phones.map((p) => (
                  <a key={p} href={`tel:${p}`} className="block hover:text-brand">{p}</a>
                ))}
              </dd>
            </div>
            <div className="py-4 flex justify-between gap-4">
              <dt className="text-ink-muted">Studio</dt>
              <dd>{SITE.location}</dd>
            </div>
            <div className="py-4 flex justify-between gap-4">
              <dt className="text-ink-muted">Response time</dt>
              <dd>Within two working days</dd>
            </div>
          </dl>
        </div>

        <form onSubmit={submit} className="rounded-[20px] bg-surface-1 border border-hairline p-6 sm:p-8 space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-[14px] text-ink-muted">
              Your name
              <input name="name" required autoComplete="name" placeholder="Ada Obi" className={`${field} mt-2`} />
            </label>
            <label className="block text-[14px] text-ink-muted">
              Email address
              <input name="email" type="email" required autoComplete="email" placeholder="ada@company.com" className={`${field} mt-2`} />
            </label>
          </div>

          <label className="block text-[14px] text-ink-muted">
            Company
            <input name="company" autoComplete="organization" placeholder="Optional" className={`${field} mt-2`} />
          </label>

          <fieldset>
            <legend className="text-[14px] text-ink-muted mb-2">Project type</legend>
            <div className="flex flex-wrap gap-2">
              {TYPES.map((t) => (
                <button
                  key={t}
                  type="button"
                  aria-pressed={type === t}
                  onClick={() => setType(t)}
                  className={`rounded-full px-4 py-2 text-[14px] transition-colors duration-200 ${
                    type === t ? 'bg-brand text-white' : 'bg-surface-2 text-ink-muted hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </fieldset>

          <label className="block text-[14px] text-ink-muted">
            Tell us about the project
            <textarea name="message" required rows={5} placeholder="What are you imagining?" className={`${field} mt-2 resize-y`} />
          </label>

          {/* Honeypot: hidden from people, filled in by spam bots */}
          <input name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

          <div className="flex flex-wrap items-center gap-4">
            <button type="submit" disabled={status === 'sending'} className={`${pillPrimary} cursor-pointer disabled:opacity-60`}>
              {status === 'sending' ? 'Sending…' : 'Send enquiry'}
            </button>
            <p role="status" className="text-[14px] text-ink-muted">
              {status === 'sent' && 'Thank you — we’ll be in touch soon.'}
              {status === 'error' && `Something went wrong. Please email ${SITE.email}.`}
            </p>
          </div>
        </form>
      </Container>
    </section>
  )
}
