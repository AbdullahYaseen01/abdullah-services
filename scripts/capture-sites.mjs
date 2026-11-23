import { chromium } from 'playwright'
import sharp from 'sharp'

const sites = [
  ['https://raahban.com', 'public/projects/raahban.webp'],
  ['https://clipzy.xynovix.com', 'public/projects/clipzy.webp'],
  ['https://autozy.co', 'public/projects/autozy.webp'],
  ['https://westorastyle.com', 'public/projects/westora.webp'],
  ['https://www.samestreetspresents.com', 'public/projects/same-streets.webp'],
]

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 })

for (const [url, file] of sites) {
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45000 })
    await page.waitForTimeout(2500)
    const png = await page.screenshot({ type: 'png' })
    await sharp(png).webp({ quality: 74 }).toFile(file)
    const meta = await sharp(file).metadata()
    console.log('saved', file, meta.width, meta.height)
  } catch (error) {
    console.error('failed', url, error instanceof Error ? error.message : error)
  }
}

await browser.close()
