import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { PROJECTS, SITE } from '../data'

export const pillPrimary =
  'inline-flex items-center justify-center rounded-full bg-white text-black text-[14px] font-medium px-5 py-[10px] hover:bg-brand hover:text-white transition-colors duration-200'
export const pillSecondary =
  'inline-flex items-center justify-center rounded-full bg-surface-2 text-white text-[14px] font-medium px-5 py-[10px] hover:bg-surface-1 transition-colors duration-200'

/** Section or page heading (the larger of the two title levels). */
export function Heading({ children, as: Tag = 'h2' }: { children: ReactNode; as?: 'h1' | 'h2' }) {
  return (
    <div className="reveal flex items-center gap-4 mb-4">
      <Tag className="heading-cond shrink-0 text-brand text-[24px] sm:text-[30px]">{children}</Tag>
      {/* Rule: red for the first 32px, then hairline grey across the rest of the row */}
      <span
        aria-hidden
        className="h-px flex-1 bg-[linear-gradient(to_right,var(--color-brand)_0,var(--color-brand)_32px,var(--color-hairline)_32px)]"
      />
    </div>
  )
}

/** Subheading that sits under a Heading's rule: small, calm, revealed just after it. */
export const subheading = 'subheading reveal reveal-delay text-[16px] sm:text-[19px]'

export function Container({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-5 sm:px-8 ${className}`}>{children}</div>
}

export function ProjectCard({ p }: { p: (typeof PROJECTS)[number] }) {
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-[20px] bg-surface-1 p-3 hover:bg-surface-2 transition-colors duration-200"
    >
      <div className="overflow-hidden rounded-[15px] aspect-video bg-surface-2">
        <img
          src={p.img}
          alt={`${p.title} project artwork`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="px-2 pt-4 pb-2 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-[18px] font-medium tracking-tight">{p.title}</h3>
          <p className="text-[14px] text-ink-muted">{p.kind}</p>
        </div>
        <span className="text-ink-muted group-hover:text-brand transition-colors" aria-hidden>↗</span>
      </div>
    </a>
  )
}

export function CtaBand() {
  return (
    <section className="py-24">
      <Container>
        <div className="rounded-[20px] p-8 sm:p-14 bg-[radial-gradient(120%_140%_at_0%_0%,#fe1f00_0%,#7a0f00_55%,#141414_100%)]">
          <h2 className="display text-[40px] sm:text-[62px] max-w-2xl">Let’s make something impossible.</h2>
          <p className="mt-4 text-[18px] text-white/85 max-w-xl">Bring us the wild idea. We’ll bring the craft.</p>
          <Link to="/contact" className={`${pillPrimary} mt-8`}>Start a project</Link>
        </div>
      </Container>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-canvas relative z-[1]">
      <Container className="py-10 flex flex-col gap-6 sm:flex-row sm:justify-between text-[14px] text-ink-muted">
        <div>
          <p className="text-white font-medium">Maverick Studios NG</p>
          <p>{SITE.location}</p>
        </div>
        <div className="flex flex-col gap-1">
          <a href={`mailto:${SITE.email}`} className="hover:text-brand">{SITE.email}</a>
          {SITE.phones.map((p) => (
            <a key={p} href={`tel:${p}`} className="hover:text-brand">{p}</a>
          ))}
        </div>
        <div className="flex gap-5">
          <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-brand">Instagram</a>
          <a href={SITE.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-brand">YouTube</a>
        </div>
      </Container>
      <Container className="pb-8 text-[13px] text-ink-muted">© {new Date().getFullYear()} Maverick Studios NG. All rights reserved.</Container>
    </footer>
  )
}
