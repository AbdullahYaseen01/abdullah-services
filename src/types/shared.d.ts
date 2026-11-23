declare module '*inquiry.mjs' {
  export const SERVICE_OPTIONS: readonly { value: string; label: string; group: string }[]
  export const BUDGET_OPTIONS: readonly { value: string; label: string }[]
  export function serviceLabel(value: string): string
  export function budgetLabel(value: string): string
  export function validateInquiry(
    input: unknown,
    now?: number,
  ): {
    ok: boolean
    errors: Record<string, string>
    value: {
      name: string
      email: string
      company: string
      service: string
      budget: string
      description: string
    } | null
  }
}

declare module '*contact-handler.mjs' {
  export function deliveryConfigured(env: Record<string, string | undefined>): boolean
  export function handleContact(args: {
    method: string
    payload?: unknown
    env: Record<string, string | undefined>
    fetchImpl?: typeof fetch
    now?: number
  }): Promise<{ status: number; body: Record<string, unknown> }>
}
