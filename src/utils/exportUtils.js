import { toPng } from 'html-to-image';
import JSZip from 'jszip';

/**
 * Escapes values for CSV format and prevents Excel formula injection (=, +, -, @)
 */
function escapeCSV(val) {
  if (val === null || val === undefined) return '""';
  let str = String(val);
  // Formula injection prevention
  if (/^[=+\-@]/.test(str)) {
    str = "'" + str;
  }
  str = str.replace(/"/g, '""');
  return `"${str}"`;
}

/**
 * Exports all slides into Canva Bulk Create compatible CSV file with all required fields
 */
export function exportToCanvaCSV(slides, filename = 'artse_canva_bulk.csv') {
  if (!slides || slides.length === 0) return;

  const headers = [
    'SlaytNo',
    'Duzen',
    'Tema',
    'Kategori',
    'Preheading',
    'Baslik',
    'AltMetin',
    'Rakam1',
    'Rakam1Aciklama',
    'Rakam2',
    'Rakam2Aciklama',
    'Maddeler',
    'CTA',
    'VurguMetni',
    'WebSitesi'
  ];
  
  const rows = slides.map((slide, index) => {
    const listText = Array.isArray(slide.listItems) 
      ? slide.listItems.join(' | ') 
      : (slide.listItems || '').replace(/\n/g, ' | ');

    return [
      escapeCSV(`${index + 1}/${slides.length}`), // Sıfır dolgusuz
      escapeCSV(slide.layoutType || 'standard'),
      escapeCSV(slide.theme || 'cream'),
      escapeCSV(slide.category || ''),
      escapeCSV(slide.preheading || ''),
      escapeCSV(slide.title || ''),
      escapeCSV(slide.subtitle || ''),
      escapeCSV(slide.stat1Number || ''),
      escapeCSV(slide.stat1Text || ''),
      escapeCSV(slide.stat2Number || ''),
      escapeCSV(slide.stat2Text || ''),
      escapeCSV(listText),
      escapeCSV(slide.ctaText || ''),
      escapeCSV(slide.highlightText || ''),
      escapeCSV('ARTSEBROKER.COM.TR')
    ];
  });

  // Prepend UTF-8 BOM so Turkish characters display correctly in Excel and Canva
  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Downloads a DOM element as a high-resolution 2x PNG (retina 2160x2700)
 */
export async function exportCanvasToPng(canvasRef, filename = 'artse_slide.png') {
  if (!canvasRef || !canvasRef.current) {
    throw new Error('Canvas referansı bulunamadı');
  }

  // Ensure fonts and images are ready before snapshot
  if (document.fonts) {
    await document.fonts.ready;
  }

  const dataUrl = await toPng(canvasRef.current, {
    quality: 1.0,
    pixelRatio: 2,
    cacheBust: true,
  });

  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

/**
 * Downloads all slides as a single ZIP file containing 2160x2700 PNGs and proje.json
 */
export async function exportCarouselZip(slides, renderSlideToDataUrl, categoryName = 'sozluk') {
  const zip = new JSZip();
  const cleanCategory = (categoryName || 'sozluk')
    .toLowerCase()
    .replace(/̇/g, '')
    .replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i')
    .replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');

  for (let i = 0; i < slides.length; i++) {
    const dataUrl = await renderSlideToDataUrl(i);
    // Extract base64
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, '');
    const filename = `${String(i + 1).padStart(2, '0')}-${cleanCategory}_${i + 1}-${slides.length}.png`;
    zip.file(filename, base64Data, { base64: true });
  }

  // Add project JSON
  const projectData = {
    version: '4.0.0',
    exportDate: new Date().toISOString(),
    slides
  };
  zip.file('proje.json', JSON.stringify(projectData, null, 2));

  const zipBlob = await zip.generateAsync({ type: 'blob' });
  const url = URL.createObjectURL(zipBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `artse_${cleanCategory}_seri.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
