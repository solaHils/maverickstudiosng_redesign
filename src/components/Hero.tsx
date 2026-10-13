import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTypewriter } from '../hooks/useTypewriter'
import { useVideoScrub } from '../hooks/useVideoScrub'
import { SITE } from '../data'

const VIDEO_URL = '/hero.mp4'
const POSTER_URL = '/hero-poster.jpg'
const TYPED = 'Your one stop access to the utopia of creativity.'
const PILLS = [
  { label: 'See our projects', to: '/portfolio' },
  { label: 'About us', to: '/about' },
  { label: 'Contact us', to: '/contact' },
]

const pill =
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em]'

/** The robot slide: scrub-on-mouse video with the welcome copy. Fills its slide. */
export default function Hero({ active = true }: { active?: boolean }) {
  const videoRef = useVideoScrub(active)
  const { displayed, done } = useTypewriter(TYPED)
  const [visible, setVisible] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 400)
    return () => clearTimeout(t)
  }, [])

  const copy = () => {
    navigator.clipboard.writeText(SITE.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#fe3a10]">
      <video
        ref={videoRef}
        src={VIDEO_URL}
        poster={POSTER_URL}
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: '70% center' }}
      />

      <div className="relative z-10 h-full flex flex-col justify-end pb-20 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10">
        <div className="max-w-xl">
          <p
            className="mb-5 sm:mb-6 text-white"
            style={{ fontSize: 'clamp(18px, 4vw, 26px)', lineHeight: 1.5, fontWeight: 400 }}
          >
            <span className="bg-black px-2 py-[2px] [box-decoration-break:clone] border-l-4 border-brand">
              Welcome to <span className="text-brand">Maverick Studios,</span>
            </span>
            <br />
            <span className="bg-black px-2 py-[2px] [box-decoration-break:clone] border-l-4 border-brand">
              a Nigeria-based 3D Animation and VFx company.
            </span>
          </p>

          <p
            className="text-white mb-5 sm:mb-6"
            style={{ fontSize: 'clamp(18px, 4vw, 26px)', lineHeight: 1.35, fontWeight: 400, minHeight: 54 }}
          >
            {displayed}
            {!done && (
              <span
                className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px]"
                style={{ animation: 'blink 1s step-end infinite' }}
              />
            )}
          </p>

          <div
            className="flex flex-wrap gap-y-1"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(8px)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            {PILLS.map((p) => (
              <Link
                key={p.to}
                to={p.to}
                className={`${pill} bg-white text-black border border-black/10 hover:bg-black hover:text-white transition-colors duration-200`}
              >
                {p.label}
              </Link>
            ))}
            <button
              onClick={copy}
              className={`${pill} gap-2 sm:gap-3 text-white bg-transparent border border-white hover:bg-white hover:text-black transition-colors duration-200 cursor-pointer`}
            >
              <span>
                {copied ? (
                  'Copied!'
                ) : (
                  <>
                    Reach us: <span className="underline underline-offset-1">{SITE.email}</span>
                  </>
                )}
              </span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1">
                <rect x="4" y="4" width="7" height="7" rx="1" />
                <rect x="1" y="1" width="7" height="7" rx="1" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
