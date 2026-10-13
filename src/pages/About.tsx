import { Link } from 'react-router-dom'
import { Container, CtaBand, Heading, pillSecondary, subheading } from '../components/ui'
import { TEAM } from '../data'

export default function About() {
  return (
    <>
      <section className="pt-40 pb-16">
        <Container>
          <Heading as="h1">The studio</Heading>
          <h2 className={`${subheading} max-w-4xl`}>Creative mavericks.</h2>
          <p className="mt-4 max-w-xl text-[15px] text-ink-muted">
            We are a Nigeria-based animation and VFX studio with creativity, fun and “why not?” at our core.
          </p>
        </Container>
      </section>

      <section className="pb-20">
        <Container className="grid gap-10 md:grid-cols-2">
          <h2 className={subheading}>Built from curiosity. Driven by craft.</h2>
          <div className="space-y-5 text-[16px] text-ink-muted">
            <p>
              It started as an idea by two engineering undergraduates at Obafemi Awolowo University in 2006. Today,
              Maverick Studios NG brings together a team of creative specialists to make ambitious stories, characters
              and visual worlds.
            </p>
            <p>
              From a first sketch to the final frame, we bring strategy, design and technical craft into one focused
              process.
            </p>
            <Link to="/portfolio" className={pillSecondary}>See what we make</Link>
          </div>
        </Container>
      </section>

      <section className="pb-8">
        <Container>
          <Heading>The people</Heading>
          <h3 className={`${subheading} mb-10`}>Small team. Big imagination.</h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {TEAM.map((m) => (
              <div key={m.name} className="rounded-[20px] bg-surface-1 p-6">
                <img
                  src={m.img}
                  alt={m.name}
                  loading="lazy"
                  className="size-24 rounded-full object-cover mb-6 ring-2 ring-brand"
                />
                <h3 className="text-[20px] font-medium tracking-tight">{m.name}</h3>
                <p className="text-[14px] text-ink-muted">{m.role}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  )
}
