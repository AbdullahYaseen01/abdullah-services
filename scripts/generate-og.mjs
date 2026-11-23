import sharp from 'sharp'

await sharp('public/og-image.svg').png().toFile('public/og-image.png')
await sharp('public/og-image.svg').webp().toFile('public/og-image.webp')
const meta = await sharp('public/og-image.png').metadata()
console.log(meta.width, meta.height, meta.format)
