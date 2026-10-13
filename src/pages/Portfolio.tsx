import { Container, CtaBand, Heading, ProjectCard, subheading } from '../components/ui'
import { PROJECTS } from '../data'

export default function Portfolio() {
  return (
    <>
      <section className="pt-40 pb-16">
        <Container>
          <Heading as="h1">Portfolio</Heading>
          <h2 className={subheading}>Ideas in motion.</h2>
          <p className="mt-4 max-w-xl text-[15px] text-ink-muted">
            Commercials, character stories, product films and visual experiences created by our team.
          </p>
        </Container>
      </section>
      <section className="pb-8">
        <Container className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.title} p={p} />
          ))}
        </Container>
      </section>
      <CtaBand />
    </>
  )
}
