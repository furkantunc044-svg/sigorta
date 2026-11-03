const http = require('http');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Ensure output directory exists
const outDir = 'C:\\Users\\Furkan\\Desktop\\Artse_Antigravity';
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Read assets
const zodiak700 = fs.readFileSync('Zodiak-700.woff2').toString('base64');
const satoshi400 = fs.readFileSync('Satoshi-400.woff2').toString('base64');
const satoshi500 = fs.readFileSync('Satoshi-500.woff2').toString('base64');
const satoshi700 = fs.readFileSync('Satoshi-700.woff2').toString('base64');
const logoDarkBg = fs.readFileSync('./public/logos/artse-official-dark.png').toString('base64'); // on dark navy
const logoLightBg = fs.readFileSync('./public/logos/artse-official-light.png').toString('base64'); // on cream/white
const photoF3 = fs.readFileSync('bd92131b-9ef5-4341-911a-9dfd76d3e9a1.jpg').toString('base64');

const fontStyles = `
@font-face {
  font-family: 'Zodiak';
  src: url(data:font/woff2;charset=utf-8;base64,${zodiak700}) format('woff2');
  font-weight: 700;
  font-style: normal;
}
@font-face {
  font-family: 'Satoshi';
  src: url(data:font/woff2;charset=utf-8;base64,${satoshi400}) format('woff2');
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: 'Satoshi';
  src: url(data:font/woff2;charset=utf-8;base64,${satoshi500}) format('woff2');
  font-weight: 500;
  font-style: normal;
}
@font-face {
  font-family: 'Satoshi';
  src: url(data:font/woff2;charset=utf-8;base64,${satoshi700}) format('woff2');
  font-weight: 700;
  font-style: normal;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

body {
  margin: 0;
  padding: 0;
  width: 1080px;
  height: 1350px;
  overflow: hidden;
}
`;

// 1. KASKO V2 HTML
const kaskoV2Html = `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="utf-8">
<style>
${fontStyles}

.canvas {
  width: 1080px;
  height: 1350px;
  background-color: #00194C;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* 1. ÜST ETİKET */
.header-area {
  position: absolute;
  top: 110px;
  left: 84px;
  right: 84px;
}

.category-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-bottom: 24px;
}

.category-square {
  width: 16px;
  height: 16px;
  background-color: #F37121;
  flex-shrink: 0;
  border-radius: 2px;
}

.category-label {
  font-family: 'Satoshi', sans-serif;
  font-weight: 700;
  font-size: 29px;
  line-height: 1.30;
  letter-spacing: 0.1em;
  color: #B3CCFF;
}

.header-divider {
  width: 100%;
  height: 1.5px;
  background-color: rgba(255, 255, 255, 0.14);
}

/* 2. BAŞLIK BLOĞU & VURGU ÇİZGİSİ */
.title-area {
  position: absolute;
  top: 420px;
  left: 84px;
  right: 84px;
}

.title-text {
  font-family: 'Zodiak', serif;
  font-weight: 700;
  font-size: 68px;
  line-height: 1.08;
  color: #FFFFFF;
  margin-bottom: 28px;
}

.accent-bar {
  width: 145px;
  height: 6px;
  background-color: #F37121;
  border-radius: 3px;
  margin-bottom: 38px;
}

/* 4. GİRİŞ PARAGRAFI */
.intro-text {
  font-family: 'Satoshi', sans-serif;
  font-weight: 400;
  font-size: 34px;
  line-height: 1.45;
  color: #B3CCFF;
  max-width: 912px;
}

/* 5. VURGU BLOĞU (İKİ SÜTUNLU, ORTADA DİKEY ÇİZGİ) */
.highlight-block {
  position: absolute;
  top: 870px;
  left: 84px;
  right: 84px;
  display: flex;
  align-items: stretch;
  gap: 48px;
}

.highlight-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.highlight-number {
  font-family: 'Satoshi', sans-serif;
  font-weight: 900;
  font-size: 110px;
  line-height: 0.92;
  color: #F8AB7C;
  margin-bottom: 16px;
}

.highlight-desc {
  font-family: 'Satoshi', sans-serif;
  font-weight: 400;
  font-size: 32px;
  line-height: 1.40;
  color: #B3CCFF;
}

.highlight-divider {
  width: 2px;
  background-color: #F37121;
  flex-shrink: 0;
  align-self: stretch;
}

/* 6. ALT ŞERİT (FOOTER) */
.footer-area {
  position: absolute;
  bottom: 0;
  left: 84px;
  right: 84px;
  height: 140px;
}

.footer-divider {
  width: 100%;
  height: 1.5px;
  background-color: rgba(255, 255, 255, 0.14);
}

.footer-content {
  height: calc(140px - 1.5px);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer-logo {
  height: 52px;
  width: auto;
  max-width: 300px;
  object-fit: contain;
  display: block;
}

.footer-url {
  font-family: 'Satoshi', sans-serif;
  font-weight: 700;
  font-size: 26px;
  letter-spacing: 0.1em;
  color: #B3CCFF;
}
</style>
</head>
<body>
<div class="canvas">
  <!-- Üst Etiket -->
  <div class="header-area">
    <div class="category-row">
      <div class="category-square"></div>
      <div class="category-label">SİGORTA REHBERİ</div>
    </div>
    <div class="header-divider"></div>
  </div>

  <!-- Başlık, Çizgi ve Giriş -->
  <div class="title-area">
    <h1 class="title-text">Kasko Poliçesi<br>Gerçekte Neyi Korur?</h1>
    <div class="accent-bar"></div>
    <p class="intro-text">
      Sadece aracın hasarını değil, beklenmedik kaza ve afet süreçlerinde finansal güvencenizi ve hareket kabiliyetinizi kesintisiz teminat altına alır.
    </p>
  </div>

  <!-- Vurgu Bloğu: İki sütun, şeftali rakam, dikey turuncu çizgi -->
  <div class="highlight-block">
    <div class="highlight-col">
      <div class="highlight-number">%100</div>
      <div class="highlight-desc">Tam kapsamlı hasar ve parça onarım güvencesi</div>
    </div>
    <div class="highlight-divider"></div>
    <div class="highlight-col">
      <div class="highlight-number">7/24</div>
      <div class="highlight-desc">Kesintisiz yol yardım ve ikame araç desteği</div>
    </div>
  </div>

  <!-- Alt Şerit -->
  <div class="footer-area">
    <div class="footer-divider"></div>
    <div class="footer-content">
      <img class="footer-logo" src="data:image/png;base64,${logoDarkBg}" alt="ARTSE Sigorta Brokerliği A.Ş.">
      <div class="footer-url">ARTSEBROKER.COM.TR</div>
    </div>
  </div>
</div>
</body>
</html>`;

// 2. F3 FOTOĞRAFLI KAPAK HTML (Üst 520px fotoğraf, altta #FAF9F6 opak plaka)
const kapakF3Html = `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="utf-8">
<style>
${fontStyles}

.canvas {
  width: 1080px;
  height: 1350px;
  background-color: #FAF9F6;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* F3: ÜST 520 PX FOTOĞRAF (Tam genişlik, sert kesim, perde yok) */
.photo-frame {
  position: absolute;
  top: 0;
  left: 0;
  width: 1080px;
  height: 520px;
  overflow: hidden;
}

.photo-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 42%; /* Varsayılan odak */
  display: block;
}

/* OPAK PLAKA İÇERİĞİ (#FAF9F6 zemin üzerinde koyu öğeler) */
.plaka-area {
  position: absolute;
  top: 520px;
  left: 0;
  width: 1080px;
  height: 830px;
  background-color: #FAF9F6;
  padding: 0 84px;
}

/* Üst etiket sekmesi y=576 (plaka içinde top: 56px) */
.header-area {
  padding-top: 56px;
}

.category-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding-bottom: 24px;
}

.category-square {
  width: 16px;
  height: 16px;
  background-color: #F37121;
  flex-shrink: 0;
  border-radius: 2px;
}

.category-label {
  font-family: 'Satoshi', sans-serif;
  font-weight: 700;
  font-size: 29px;
  line-height: 1.30;
  letter-spacing: 0.1em;
  color: #00194C;
}

.header-divider {
  width: 100%;
  height: 1.5px;
  background-color: rgba(0, 25, 76, 0.12);
}

/* Gövde alanı y=706'dan başlar (plaka içinde top: 186px) */
.content-body {
  margin-top: 50px;
}

.title-text {
  font-family: 'Zodiak', serif;
  font-weight: 700;
  font-size: 68px;
  line-height: 1.08;
  color: #00194C;
  margin-bottom: 26px;
}

.accent-bar {
  width: 145px;
  height: 6px;
  background-color: #F37121;
  border-radius: 3px;
  margin-bottom: 34px;
}

.intro-text {
  font-family: 'Satoshi', sans-serif;
  font-weight: 400;
  font-size: 34px;
  line-height: 1.45;
  color: #334E68;
  max-width: 912px;
}

/* Alt Şerit (Footer) - Plaka üzerinde */
.footer-area {
  position: absolute;
  bottom: 0;
  left: 84px;
  right: 84px;
  height: 140px;
}

.footer-divider {
  width: 100%;
  height: 1.5px;
  background-color: rgba(0, 25, 76, 0.12);
}

.footer-content {
  height: calc(140px - 1.5px);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.footer-logo {
  height: 52px;
  width: auto;
  max-width: 300px;
  object-fit: contain;
  display: block;
}

.footer-url {
  font-family: 'Satoshi', sans-serif;
  font-weight: 700;
  font-size: 26px;
  letter-spacing: 0.1em;
  color: #00194C;
}
</style>
</head>
<body>
<div class="canvas">
  <!-- Üst Kadraj Fotoğraf (Üst 520px, tam genişlik, perde yok) -->
  <div class="photo-frame">
    <img class="photo-img" src="data:image/jpeg;base64,${photoF3}" alt="Endüstriyel Üretim ve Lojistik Sahnesi">
  </div>

  <!-- Opak Plaka (#FAF9F6 zemin, koyu tipografi) -->
  <div class="plaka-area">
    <div class="header-area">
      <div class="category-row">
        <div class="category-square"></div>
        <div class="category-label">KURUMSAL RİSK YÖNETİMİ</div>
      </div>
      <div class="header-divider"></div>
    </div>

    <div class="content-body">
      <h1 class="title-text">Sanayi ve Lojistikte<br>Kesintisiz Güvence</h1>
      <div class="accent-bar"></div>
      <p class="intro-text">
        Tedarik zincirinden ağır makine operasyonlarına kadar tüm operasyonel risklerinizi ARTSE uzmanlığıyla eksiksiz güvenceye alın.
      </p>
    </div>

    <!-- Alt Şerit -->
    <div class="footer-area">
      <div class="footer-divider"></div>
      <div class="footer-content">
        <img class="footer-logo" src="data:image/png;base64,${logoLightBg}" alt="ARTSE Sigorta Brokerliği A.Ş.">
        <div class="footer-url">ARTSEBROKER.COM.TR</div>
      </div>
    </div>
  </div>
</div>
</body>
</html>`;

// Render function using Chrome headless
function renderPages() {
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    if (req.url === '/kasko') {
      res.end(kaskoV2Html);
    } else if (req.url === '/kapak') {
      res.end(kapakF3Html);
    } else {
      res.end('Not Found');
    }
  });

  server.listen(9877, async () => {
    const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
    
    // Output paths
    const kaskoOut = path.join(outDir, 'Kasko_v2.png');
    const kapakOut = path.join(outDir, 'Kapak_Foto_v1.png');

    // Also mirror to C:\Users\PC\Desktop\Artse_Antigravity if PC path exists or requested
    const cmd1 = `"${chromePath}" --headless --disable-gpu --force-device-scale-factor=2 --window-size=1080,1350 --screenshot="${kaskoOut}" http://localhost:9877/kasko`;
    const cmd2 = `"${chromePath}" --headless --disable-gpu --force-device-scale-factor=2 --window-size=1080,1350 --screenshot="${kapakOut}" http://localhost:9877/kapak`;

    console.log('Rendering Kasko_v2.png...');
    exec(cmd1, (err1) => {
      if (err1) console.error('Error rendering Kasko:', err1);
      else console.log('Successfully generated:', kaskoOut);

      console.log('Rendering Kapak_Foto_v1.png...');
      exec(cmd2, (err2) => {
        if (err2) console.error('Error rendering Kapak:', err2);
        else console.log('Successfully generated:', kapakOut);

        server.close();
      });
    });
  });
}

renderPages();
