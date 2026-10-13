import { Link } from 'react-router-dom'
import HeroSlider from '../components/HeroSlider'
import { Container, CtaBand, Heading, ProjectCard, pillSecondary, subheading } from '../components/ui'
import { PROJECTS, SERVICES } from '../data'

export default function Home() {
  return (
    <>
      <h1 className="sr-only">Maverick Studios NG: 3D animation and VFX in Nigeria</h1>
      <HeroSlider />
      <div className="relative z-[1] bg-canvas">
        <section className="py-24">
          <Container className="grid gap-12 md:grid-cols-2">
            <div>
              <Heading>The studio</Heading>
              <p className={subheading}>
                Ideas become characters, products become worlds, and stories become moments that stay with people.
              </p>
            </div>
            <ul className="self-end divide-y divide-hairline border-y border-hairline">
              {SERVICES.map((s, i) => (
                <li key={s} className="flex justify-between py-5 text-[22px]">
                  <span>{s}</span>
                  <span className="text-ink-muted">0{i + 1}</span>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section className="pb-24">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
              <div>
                <Heading>Selected work</Heading>
                <h3 className={subheading}>Made to move.</h3>
              </div>
              <Link to="/portfolio" className={pillSecondary}>View all work</Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {PROJECTS.slice(0, 3).map((p) => (
                <ProjectCard key={p.title} p={p} />
              ))}
            </div>
          </Container>
        </section>

        <CtaBand />
      </div>
    </>
  )
}
