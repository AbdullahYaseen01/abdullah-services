import { defineConfig, loadEnv, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import type { IncomingMessage, ServerResponse } from 'node:http'

function readBody(req: IncomingMessage) {
  return new Promise<string>((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (chunk: Buffer | string) => chunks.push(Buffer.from(chunk)))
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

function contactApi(env: Record<string, string>): Plugin {
  return {
    name: 'contact-api',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res: ServerResponse) => {
        const { handleContact } = await import('./shared/contact-handler.mjs')
        let payload: unknown
        if (req.method === 'POST') {
          try {
            const raw = await readBody(req)
            payload = raw ? JSON.parse(raw) : {}
          } catch {
            payload = null
          }
        }
        const result = await handleContact({
          method: req.method || 'GET',
          payload,
          env,
        })
        res.statusCode = result.status
        res.setHeader('Content-Type', 'application/json')
        res.setHeader('Cache-Control', 'no-store')
        res.end(JSON.stringify(result.body))
      })
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), tailwindcss(), contactApi(env)],
    build: {
      target: 'es2020',
      cssMinify: true,
      modulePreload: { polyfill: false },
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules') && id.includes('react-router')) return 'router'
            if (
              id.includes('node_modules') &&
              (id.includes('/react-dom/') || id.includes('/react/') || id.includes('scheduler'))
            ) {
              return 'react'
            }
          },
        },
      },
    },
  }
})
