import sharp from 'sharp';

const W = 1200, H = 630;
const NAME = 'Mohamad Alhaddad';
const ROLE = 'AI Solutions Engineer';
const LINE1 = 'LLM agent systems, retrieval pipelines,';
const LINE2 = 'and computer vision that runs in production.';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const bg = `
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%"  stop-color="#0b0d12"/>
      <stop offset="55%" stop-color="#07080b"/>
      <stop offset="100%" stop-color="#10141c"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.15" cy="0.1" r="0.8">
      <stop offset="0%"  stop-color="#0e7490" stop-opacity="0.30"/>
      <stop offset="100%" stop-color="#0e7490" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glow2" cx="0.95" cy="0.9" r="0.7">
      <stop offset="0%"  stop-color="#6d28d9" stop-opacity="0.26"/>
      <stop offset="100%" stop-color="#6d28d9" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="round"><rect x="792" y="150" width="300" height="330" rx="18"/></clipPath>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect width="${W}" height="${H}" fill="url(#glow2)"/>

  <!-- accent rule top -->
  <rect x="0" y="0" width="${W}" height="5" fill="#58cbe0"/>

  <text x="88" y="243" font-family="Georgia, 'Times New Roman', serif"
        font-size="72" fill="#f2f0f4">${esc(NAME)}</text>

  <text x="90" y="292" font-family="Menlo, Consolas, monospace"
        font-size="25" letter-spacing="1.5" fill="#58cbe0">${esc(ROLE)}</text>

  <rect x="90" y="330" width="72" height="2" fill="#3a3a47"/>

  <text x="90" y="393" font-family="Helvetica, Arial, sans-serif"
        font-size="27" fill="#a5a2ae">${esc(LINE1)}</text>
  <text x="90" y="432" font-family="Helvetica, Arial, sans-serif"
        font-size="27" fill="#a5a2ae">${esc(LINE2)}</text>

  <text x="90" y="527" font-family="Menlo, Consolas, monospace"
        font-size="23" letter-spacing="2" fill="#6d6a78">alhaddad.dev</text>
</svg>`;

// Portrait, cropped to the rounded panel on the right.
const portrait = await sharp('src/assets/portrait.png')
  .resize(300, 330, { fit: 'cover', position: 'top' })
  .toBuffer();

const mask = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="300" height="330">
     <rect width="300" height="330" rx="18" fill="#fff"/>
   </svg>`
);

const rounded = await sharp(portrait)
  .composite([{ input: mask, blend: 'dest-in' }])
  .png()
  .toBuffer();

await sharp(Buffer.from(bg))
  .composite([{ input: rounded, left: 792, top: 150 }])
  .png({ quality: 92 })
  .toFile('public/og.png');

const meta = await sharp('public/og.png').metadata();
console.log(`wrote public/og.png ${meta.width}x${meta.height}`);
