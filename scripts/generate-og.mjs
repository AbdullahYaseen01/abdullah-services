import sharp from 'sharp'

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f4efe6"/>
  <rect x="0" y="0" width="18" height="630" fill="#2436c7"/>
  <text x="72" y="150" fill="#b33b28" font-family="Segoe UI, Arial, sans-serif" font-size="28" font-weight="700" letter-spacing="4">ABDULLAH YASEEN</text>
  <text x="72" y="280" fill="#1c1422" font-family="Georgia, serif" font-size="68">Building intelligent</text>
  <text x="72" y="360" fill="#1c1422" font-family="Georgia, serif" font-size="68">digital products.</text>
  <text x="72" y="450" fill="#534858" font-family="Segoe UI, Arial, sans-serif" font-size="30">AI applications, agents, automation, and SaaS.</text>
  <text x="72" y="540" fill="#2436c7" font-family="Segoe UI, Arial, sans-serif" font-size="26" font-weight="700">abdullahyaseen.dev</text>
</svg>`

await sharp(Buffer.from(svg)).png().toFile('public/og-image.png')
const meta = await sharp('public/og-image.png').metadata()
console.log(meta.width, meta.height, meta.format)
