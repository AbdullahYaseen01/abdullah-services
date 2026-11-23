import { useEffect, useId, useState, type FormEvent } from 'react'
import { BUDGET_OPTIONS, SERVICE_OPTIONS, validateInquiry } from '../../shared/inquiry.mjs'
import { useInquiry } from '../context/useInquiry'
type FormState = {
  name: string
  email: string
  company: string
  service: string
  budget: string
  description: string
  website: string
}

const EMPTY: FormState = {
  name: '',
  email: '',
  company: '',
  service: '',
  budget: '',
  description: '',
  website: '',
}

type Delivery = 'checking' | 'ready' | 'unavailable'

export function InquiryForm() {
  const { service } = useInquiry()
  const [delivery, setDelivery] = useState<Delivery>('checking')
  const [form, setForm] = useState<FormState>(EMPTY)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const [startedAt] = useState(() => Date.now())
  const [trackedService, setTrackedService] = useState(service)
  const statusId = useId()
  const groups = [...new Set(SERVICE_OPTIONS.map((option) => option.group))]

  if (service !== trackedService) {
    setTrackedService(service)
    if (service) setForm((current) => ({ ...current, service }))
  }

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/contact', { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) {
          setDelivery('unavailable')
          return
        }
        const body = (await response.json()) as { configured?: boolean }
        setDelivery(body.configured ? 'ready' : 'unavailable')
      })
      .catch(() => {
        if (!controller.signal.aborted) setDelivery('unavailable')
      })
    return () => controller.abort()
  }, [])

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'submitting' || delivery !== 'ready') return

    const payload = { ...form, startedAt }
    const checked = validateInquiry(payload)
    if (!checked.ok) {
      setErrors(checked.errors)
      setStatus('error')
      setMessage(checked.errors.form || 'Check the highlighted fields and try again.')
      return
    }

    setErrors({})
    setStatus('submitting')
    setMessage('Sending your inquiry.')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const body = (await response.json()) as {
        ok?: boolean
        message?: string
        error?: string
        errors?: Record<string, string>
      }
      if (response.ok && body.ok) {
        setStatus('success')
        setMessage(body.message || 'Your inquiry was accepted for delivery.')
        setForm(EMPTY)
        return
      }
      setStatus('error')
      setErrors(body.errors ?? {})
      setMessage(body.error || 'The inquiry was not accepted. Please try again.')
    } catch {
      setStatus('error')
      setMessage('The inquiry could not be sent. Your details are still in the form. Please try again.')
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
      <div>
        <p className="kicker">Contact</p>
        <h2 className="display mt-3 text-4xl leading-tight text-cream sm:text-5xl">Let's build something that works.</h2>
        <p className="mt-4 text-lg leading-relaxed text-[#d7e4d4]">
          Share the system you want built. The form sends only when mail delivery is configured.
        </p>
      </div>

      <div className="rounded-3xl bg-paper-2 p-5 text-ink sm:p-7">
        {delivery === 'checking' && <p className="text-muted">Checking whether the inquiry form can deliver email.</p>}

        {delivery === 'unavailable' && (
          <div>
            <h3 className="display text-3xl">The form is not sending yet.</h3>
            <p className="mt-3 leading-relaxed text-muted">
              The inquiry form is implemented, and live delivery is not configured in this environment. Nothing here is recorded as a successful submission.
            </p>
          </div>
        )}

        {delivery === 'ready' && status === 'success' && (
          <p role="status" className="text-lg leading-relaxed">
            {message}
          </p>
        )}

        {delivery === 'ready' && status !== 'success' && (
          <form onSubmit={onSubmit} noValidate>
            <div className="grid gap-4">
              <div className={status === 'error' ? '' : 'sr-only'} id={statusId} role="status" aria-live="polite">
                {message}
              </div>
              <Field label="Name" name="name" error={errors.name} value={form.name} autoComplete="name" onChange={(value) => update('name', value)} />
              <Field label="Email" name="email" type="email" error={errors.email} value={form.email} autoComplete="email" onChange={(value) => update('email', value)} />
              <Field
                label="Company"
                name="company"
                hint="Optional"
                error={errors.company}
                value={form.company}
                autoComplete="organization"
                onChange={(value) => update('company', value)}
              />
              <label className="field">
                <span>Service required</span>
                <select
                  name="service"
                  value={form.service}
                  aria-invalid={Boolean(errors.service)}
                  aria-describedby={errors.service ? 'service-error' : undefined}
                  onChange={(event) => update('service', event.target.value)}
                >
                  <option value="">Select a service</option>
                  {groups.map((group) => (
                    <optgroup key={group} label={group}>
                      {SERVICE_OPTIONS.filter((option) => option.group === group).map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
                {errors.service && (
                  <small id="service-error" className="field-error">
                    {errors.service}
                  </small>
                )}
              </label>
              <label className="field">
                <span>Estimated budget</span>
                <select
                  name="budget"
                  value={form.budget}
                  aria-invalid={Boolean(errors.budget)}
                  aria-describedby={errors.budget ? 'budget-error' : undefined}
                  onChange={(event) => update('budget', event.target.value)}
                >
                  <option value="">Select a range</option>
                  {BUDGET_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.budget && (
                  <small id="budget-error" className="field-error">
                    {errors.budget}
                  </small>
                )}
              </label>
              <label className="field">
                <span>Project description</span>
                <textarea
                  name="description"
                  value={form.description}
                  aria-invalid={Boolean(errors.description)}
                  aria-describedby={errors.description ? 'description-error' : 'description-hint'}
                  onChange={(event) => update('description', event.target.value)}
                />
                <small id="description-hint" className="text-sm text-muted">
                  What the system needs to do, and any tools it has to connect to.
                </small>
                {errors.description && (
                  <small id="description-error" className="field-error">
                    {errors.description}
                  </small>
                )}
              </label>
              <div className="hp" aria-hidden="true">
                <label>
                  Company website
                  <input
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(event) => update('website', event.target.value)}
                  />
                </label>
              </div>
              {errors.form && <p className="field-error">{errors.form}</p>}
              <button className="btn btn-primary" type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending…' : 'Send inquiry'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

function Field({
  label,
  name,
  value,
  onChange,
  error,
  type = 'text',
  autoComplete,
  hint,
}: {
  label: string
  name: string
  value: string
  onChange: (value: string) => void
  error?: string
  type?: string
  autoComplete?: string
  hint?: string
}) {
  const errorId = `${name}-error`
  return (
    <label className="field">
      <span>
        {label}
        {hint ? <em className="ml-2 text-sm font-medium text-muted not-italic">{hint}</em> : null}
      </span>
      <input
        name={name}
        type={type}
        value={value}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
      {error && (
        <small id={errorId} className="field-error">
          {error}
        </small>
      )}
    </label>
  )
}
