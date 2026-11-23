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

      <article className="mt-10 grid overflow-hidden rounded-[1.7rem] bg-night text-cream lg:grid-cols-[1.15fr_0.85fr]">
        <ProjectImage project={lead} priority />
            <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
          <p className="text-xs font-bold tracking-[0.14em] text-lime uppercase">{lead.kicker}</p>
          <h3 className="display mt-3 text-4xl">{lead.name}</h3>
              <ProjectCopy project={lead} tone="night" />
        </div>
      </article>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {rest.map((project) => (
          <article key={project.slug} className="overflow-hidden rounded-[1.5rem] border border-line bg-paper-2 shadow-[0_16px_40px_rgb(8_31_20/6%)]">
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
          <article key={project.slug} className="rounded-[1.4rem] border border-[#d9f582]/40 bg-night p-6 text-cream sm:p-7">
            <p className="kicker">{project.kicker}</p>
            <h3 className="display mt-2 text-3xl">{project.name}</h3>
            <p className="mt-3 text-sm font-semibold text-lime">No detection image is published on this page.</p>
            <ProjectCopy project={project} tone="night" />
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
    <div className="bg-night p-1.5">
    <img
      src={project.image}
      alt={project.imageAlt}
      width={project.width}
      height={project.height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      className="aspect-[16/10] h-auto w-full rounded-xl object-cover object-top"
      onError={() => setFailed(true)}
    />
    </div>
  )
}

function ProjectCopy({ project, compact = false, tone = 'paper' }: { project: Project; compact?: boolean; tone?: 'paper' | 'night' }) {
  const muted = tone === 'night' ? 'text-[#d7e4d4]' : 'text-muted'
  const faint = tone === 'night' ? 'text-[#c5d4bf]' : 'text-faint'
  return (
    <div className="mt-3">
      <p className={compact ? `leading-relaxed ${muted}` : `text-lg leading-relaxed ${muted}`}>{project.summary}</p>
      {!compact && <p className="mt-3 leading-relaxed">{project.does}</p>}
      {project.role && !/founder/i.test(project.role) && <p className="mt-3 text-sm font-semibold">Role: {project.role}</p>}
      {project.stack.length > 0 && (
        <p className={`mt-2 text-sm ${muted}`}>Stack: {project.stack.join(', ')}</p>
      )}
      {project.stackNote && <p className={`mt-2 text-sm leading-relaxed ${faint}`}>{project.stackNote}</p>}
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
