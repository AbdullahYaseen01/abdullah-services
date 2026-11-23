import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PROJECTS, type Project } from '../data/projects'

export function Work() {
  const featured = PROJECTS.filter((project) => project.group === 'featured')
  const previous = PROJECTS.filter((project) => project.group === 'previous')
  const vision = PROJECTS.filter((project) => project.group === 'vision')
  const [lead, ...rest] = featured

  return (
    <section id="work" className="wrap py-16 md:py-24">
      <div className="max-w-2xl">
        <p className="kicker">Selected work</p>
        <h2 className="display mt-3 text-4xl leading-tight sm:text-5xl">Software with a public record.</h2>
        <p className="prose-muted mt-4">
          These are products and systems I can point to. Offered services further down are not all backed by a public case study.
        </p>
      </div>

      <article className="mt-10 grid overflow-hidden rounded-[1.7rem] border border-line bg-paper-2 lg:grid-cols-[1.15fr_0.85fr]">
        <ProjectImage project={lead} priority />
        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <p className="kicker">{lead.kicker}</p>
          <h3 className="display mt-3 text-4xl">{lead.name}</h3>
          <ProjectCopy project={lead} />
        </div>
      </article>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {rest.map((project) => (
          <article key={project.slug} className="overflow-hidden rounded-[1.5rem] border border-line bg-paper-2">
            <ProjectImage project={project} />
            <div className="p-6 sm:p-7">
              <p className="kicker">{project.kicker}</p>
              <h3 className="display mt-2 text-3xl">{project.name}</h3>
              <ProjectCopy project={project} />
            </div>
          </article>
        ))}
      </div>

      <div className="mt-14">
        <h3 className="display text-3xl">Previous websites</h3>
        <p className="mt-2 max-w-2xl text-muted">
          Westora Style is e-commerce. Same Streets Presents is a live-music site. Neither is described with a platform or sales result that was not verified.
        </p>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {previous.map((project) => (
            <article key={project.slug} className="grid gap-0 overflow-hidden rounded-[1.4rem] border border-line bg-white sm:grid-cols-[0.9fr_1.1fr]">
              <ProjectImage project={project} />
              <div className="p-5">
                <p className="kicker">{project.kicker}</p>
                <h3 className="display mt-2 text-2xl">{project.name}</h3>
                <ProjectCopy project={project} compact />
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-14 grid gap-4">
        <h3 className="display text-3xl">Computer vision</h3>
        {vision.map((project) => (
          <article key={project.slug} className="rounded-[1.4rem] border border-dashed border-line bg-sand/50 p-6 sm:p-7">
            <p className="kicker">{project.kicker}</p>
            <h3 className="display mt-2 text-3xl">{project.name}</h3>
            <p className="mt-3 text-sm font-semibold text-cobalt">No detection image is published on this page.</p>
            <ProjectCopy project={project} />
          </article>
        ))}
      </div>
    </section>
  )
}

function ProjectImage({ project, priority = false }: { project: Project; priority?: boolean }) {
  const [failed, setFailed] = useState(false)
  if (!project.image || failed) {
    return (
      <div className="grid min-h-48 place-items-center bg-sand px-6 text-center text-sm font-medium text-muted">
        Screenshot not available
      </div>
    )
  }
  return (
    <img
      src={project.image}
      alt={project.imageAlt}
      width={project.width}
      height={project.height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      className="aspect-[16/10] h-auto w-full object-cover object-top"
      onError={() => setFailed(true)}
    />
  )
}

function ProjectCopy({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <div className="mt-3">
      <p className={compact ? 'leading-relaxed text-muted' : 'text-lg leading-relaxed text-muted'}>{project.summary}</p>
      {!compact && <p className="mt-3 leading-relaxed">{project.does}</p>}
      {project.role && <p className="mt-3 text-sm font-semibold">Role: {project.role}</p>}
      {project.stack.length > 0 && (
        <p className="mt-2 text-sm text-muted">Stack: {project.stack.join(', ')}</p>
      )}
      {project.stackNote && <p className="mt-2 text-sm leading-relaxed text-faint">{project.stackNote}</p>}
      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm font-semibold">
        <Link to={`/work/${project.slug}`}>Project details</Link>
        {project.url && (
          <a href={project.url}>
            {project.urlLabel} <span aria-hidden="true">↗</span>
          </a>
        )}
        {project.github && (
          <a href={project.github}>
            GitHub <span aria-hidden="true">↗</span>
          </a>
        )}
      </div>
    </div>
  )
}
