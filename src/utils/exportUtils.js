import { toPng, toSvg } from 'html-to-image';

/**
 * Escapes values for CSV format
 */
function escapeCSV(val) {
  if (val === null || val === undefined) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

/**
 * Exports all slides into Canva Bulk Create compatible CSV file
 */
export function exportToCanvaCSV(slides, filename = 'artse_carousel_canva.csv') {
  if (!slides || slides.length === 0) return;

  const headers = ['Baslik', 'AltMetin', 'Kategori', 'VurguMetni', 'SlaytNo', 'WebSitesi'];
  
  const rows = slides.map((slide, index) => [
    escapeCSV(slide.title || ''),
    escapeCSV(slide.subtitle || ''),
    escapeCSV(slide.category || 'SİGORTA HAFTASI'),
    escapeCSV(slide.highlightText || ''),
    escapeCSV(`${index + 1}/${slides.length}`),
    escapeCSV('ARTSEBROKER.COM.TR')
  ]);

  // Prepend UTF-8 BOM so Turkish characters (ğ, ş, ı, ö, ç, ü, İ) display correctly in Excel and Canva
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
 * Downloads a DOM element as a high-resolution PNG
 */
export async function exportCanvasToPng(canvasRef, filename = 'artse_slide.png') {
  if (!canvasRef || !canvasRef.current) {
    throw new Error('Canvas referansı bulunamadı');
  }

  // Use pixelRatio 2 for ultra-crisp output (at 1080x1080 canvas this yields crisp retina)
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
 * Downloads a DOM element as SVG
 */
export async function exportCanvasToSvg(canvasRef, filename = 'artse_slide.svg') {
  if (!canvasRef || !canvasRef.current) {
    throw new Error('Canvas referansı bulunamadı');
  }

  const dataUrl = await toSvg(canvasRef.current, {
    cacheBust: true,
  });

  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}
