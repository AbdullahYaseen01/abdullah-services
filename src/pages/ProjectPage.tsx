import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProject } from '../data/projects'
import { PROFILE } from '../data/profile'

export function ProjectPage() {
  const { slug = '' } = useParams()
  const project = getProject(slug)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    if (!project) {
      document.title = 'Project not found — Abdullah Yaseen'
      return
    }
    document.title = `${project.name} — ${PROFILE.name}`
    window.scrollTo(0, 0)
  }, [project])

  if (!project) {
    return (
      <div className="wrap py-24">
        <h1 className="display text-5xl">That project is not listed.</h1>
        <Link className="btn btn-primary mt-6" to="/">
          Back home
        </Link>
      </div>
    )
  }

  return (
    <article className="wrap py-12 md:py-16">
      <Link to="/#work" className="text-sm font-semibold">
        ← All projects
      </Link>
      <p className="kicker mt-6">{project.kicker}</p>
      <h1 className="display mt-3 text-5xl leading-none sm:text-6xl">{project.name}</h1>
      <p className="mt-4 max-w-2xl text-xl leading-relaxed text-muted">{project.summary}</p>

      {project.image && !failed && (
        <img
          src={project.image}
          alt={project.imageAlt}
          width={project.width}
          height={project.height}
          className="mt-8 w-full rounded-[1.4rem] border border-line object-cover object-top"
          onError={() => setFailed(true)}
        />
      )}

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section>
          <h2 className="text-lg font-semibold">Problem</h2>
          <p className="mt-2 leading-relaxed text-muted">{project.problem}</p>
        </section>
        <section>
          <h2 className="text-lg font-semibold">What it does</h2>
          <p className="mt-2 leading-relaxed text-muted">{project.does}</p>
        </section>
      </div>

      <dl className="mt-8 grid gap-4 rounded-2xl border border-line bg-paper-2 p-5">
        <div>
          <dt className="text-sm font-semibold">Role</dt>
          <dd className="mt-1 text-muted">{project.role ?? 'Not stated. No ownership is claimed.'}</dd>
        </div>
        <div>
          <dt className="text-sm font-semibold">Technology</dt>
          <dd className="mt-1 text-muted">
            {project.stack.length ? project.stack.join(', ') : 'Not published.'}
            {project.stackNote ? ` ${project.stackNote}` : ''}
          </dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-wrap gap-3">
        {project.url && (
          <a className="btn btn-primary" href={project.url}>
            Visit {project.urlLabel}
          </a>
        )}
        {project.github && (
          <a className="btn btn-secondary" href={project.github}>
            View GitHub
          </a>
        )}
      </div>
    </article>
  )
}
