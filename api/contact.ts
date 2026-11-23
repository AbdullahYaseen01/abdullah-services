import { handleContact } from '../shared/contact-handler.mjs'

export async function GET() {
  const result = await handleContact({ method: 'GET', env: process.env })
  return Response.json(result.body, {
    status: result.status,
    headers: { 'Cache-Control': 'no-store' },
  })
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null)
  const result = await handleContact({ method: 'POST', payload, env: process.env })
  return Response.json(result.body, {
    status: result.status,
    headers: { 'Cache-Control': 'no-store' },
  })
}
