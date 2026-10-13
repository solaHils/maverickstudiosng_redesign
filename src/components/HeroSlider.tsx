import { useEffect, useState, type KeyboardEvent } from 'react'
import Hero from './Hero'

type Slide = { kind: 'robot' } | { kind: 'image'; src: string; alt: string }

// Robot first, then the old home-page banners mixed with frames from the YouTube channel.
const SLIDES: Slide[] = [
  { kind: 'robot' },
  { kind: 'image', src: '/slides/banner-01.jpg', alt: 'Best Animation Commercial award from the Lagos International Festival of Animation' },
  { kind: 'image', src: '/slides/magical-viva.jpg', alt: 'Magical Viva: animated characters beside a green bicycle mascot' },
  { kind: 'image', src: '/slides/banner-02.jpg', alt: 'Maverick Studios animation banner' },
  { kind: 'image', src: '/slides/raptor.jpg', alt: 'Raptor: armoured 3D robot characters in battle' },
  { kind: 'image', src: '/slides/banner-03.jpg', alt: 'CliqLite World comics for Etisalat' },
  { kind: 'image', src: '/slides/robo-fone.jpg', alt: 'Robo Fone: a friendly 3D robot at a desk' },
  { kind: 'image', src: '/slides/banner-04.jpg', alt: 'Mr Chef: an animated chef seasoning a pot' },
  { kind: 'image', src: '/slides/super-eagles.jpg', alt: 'Super Eagles animation: a footballer in a stadium' },
  { kind: 'image', src: '/slides/banner-05.jpg', alt: 'Maverick Studios animation banner' },
  { kind: 'image', src: '/slides/hair-groom.jpg', alt: 'A 3D character hair groom study' },
  { kind: 'image', src: '/slides/banner-06.jpg', alt: 'Maverick Studios animation banner' },
  { kind: 'image', src: '/slides/banner-07.jpg', alt: 'Rio 2016 Olympic taekwondo and table tennis animation' },
]

const ROBOT_MS = 10000 // robot slide stays longer so the mouse tracking can be used
const IMAGE_MS = 6000

export default function HeroSlider() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = SLIDES.length

  const go = (i: number) => setIndex((i + count) % count)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (paused || reduced) return
    const t = window.setTimeout(() => go(index + 1), index === 0 ? ROBOT_MS : IMAGE_MS)
    return () => window.clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, paused])

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'ArrowLeft') go(index - 1)
    if (e.key === 'ArrowRight') go(index + 1)
  }

  const arrow =
    'grid place-items-center size-10 rounded-full bg-black/55 text-white backdrop-blur hover:bg-brand transition-colors duration-200 cursor-pointer'

  return (
    // The fixed nav strip is 64px tall, so the slider starts below it.
    <section
      aria-roledescription="carousel"
      aria-label="Featured work"
      tabIndex={0}
      onKeyDown={onKey}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className="relative z-[1] mt-16 h-[75dvh] min-h-[520px] overflow-hidden bg-canvas outline-offset-[-4px]"
    >
      {SLIDES.map((s, i) => (
        <div
          key={i}
          role="group"
          aria-roledescription="slide"
          aria-label={`${i + 1} of ${count}`}
          aria-hidden={i !== index}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === index ? 1 : 0, pointerEvents: i === index ? 'auto' : 'none' }}
        >
          {s.kind === 'robot' ? (
            <Hero active={i === index} />
          ) : (
            <>
              <img src={s.src} alt={s.alt} className="h-full w-full object-cover" loading={i <= 2 ? 'eager' : 'lazy'} />
              {/* Translucent caption box, bottom left, like the original site */}
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10 max-w-[min(320px,calc(100%-8.5rem))] sm:max-w-[340px] bg-black/75 px-4 py-3 text-[14px] sm:text-[15px] leading-relaxed text-white">
                <span className="font-medium tracking-[0.18em] text-brand">WELCOME</span> to Maverick Studios – a
                Nigeria-based 3D Animation and VFx company. Your one stop access to the utopia of creativity.
                <br />
                Enjoy your tour.
              </div>
            </>
          )}
        </div>
      ))}

      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-[6px] rounded-full bg-black/55 px-3 py-2 backdrop-blur">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              onClick={() => go(i)}
              className={`h-[7px] rounded-full transition-all duration-300 cursor-pointer ${
                i === index ? 'w-5 bg-brand' : 'w-[7px] bg-white/60 hover:bg-white'
              }`}
            />
          ))}
        </div>
        <button aria-label="Previous slide" className={arrow} onClick={() => go(index - 1)}>❮</button>
        <button aria-label="Next slide" className={arrow} onClick={() => go(index + 1)}>❯</button>
      </div>
    </section>
  )
}
