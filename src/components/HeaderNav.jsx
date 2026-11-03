import React from 'react';
import { 
  Download, 
  FileSpreadsheet, 
  Image as ImageIcon, 
  Maximize2, 
  Layers,
  CheckCircle2,
  Code
} from 'lucide-react';

export default function HeaderNav({
  aspectRatio,
  setAspectRatio,
  showSlideNumber,
  setShowSlideNumber,
  onExportCSV,
  onExportPNG,
  onExportSVG,
  onExportAllPNG,
  isExporting
}) {
  return (
    <header className="h-16 border-b border-slate-800 bg-[#0B0F17] px-6 flex items-center justify-between z-20">
      {/* Sol Logo & Başlık */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F25822] to-[#B83E10] flex items-center justify-center font-bold text-white shadow-md shadow-[#F25822]/20">
            A
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-100 tracking-wider text-sm">
                ARTSE
              </span>
              <span className="text-xs text-slate-400 font-light">| Carousel Studio</span>
            </div>
            <p className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">
              Quiet Luxury Post Otomasyonu
            </p>
          </div>
        </div>
      </div>

      {/* Orta Kontroller (Format Seçimi) */}
      <div className="flex items-center gap-3">
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs">
          <button
            onClick={() => setAspectRatio('1:1')}
            className={`px-3 py-1 rounded-md font-medium transition ${
              aspectRatio === '1:1'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            1:1 Kare (1080x1080)
          </button>
          <button
            onClick={() => setAspectRatio('4:5')}
            className={`px-3 py-1 rounded-md font-medium transition ${
              aspectRatio === '4:5'
                ? 'bg-slate-800 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            4:5 Dikey (1080x1350)
          </button>
        </div>

        <button
          onClick={() => setShowSlideNumber(!showSlideNumber)}
          className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium transition flex items-center gap-1.5 ${
            showSlideNumber
              ? 'bg-slate-900 border-slate-700 text-slate-200'
              : 'bg-transparent border-slate-800 text-slate-500'
          }`}
          title="Slayt numarasını göster/gizle"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Sayfa No</span>
        </button>
      </div>

      {/* Sağ Dışa Aktarma Butonları */}
      <div className="flex items-center gap-2.5">
        {/* Canva CSV Export */}
        <button
          onClick={onExportCSV}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg transition"
          title="Canva Toplu Oluşturma (Bulk Create) uyumlu CSV dosyasını indir"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Canva CSV</span>
        </button>

        {/* SVG Export */}
        <button
          onClick={onExportSVG}
          disabled={isExporting}
          className="flex items-center gap-1.5 px-2.5 py-2 text-xs font-medium text-slate-300 bg-slate-850 hover:bg-slate-800 border border-slate-700 rounded-lg transition disabled:opacity-50"
          title="Vektörel SVG olarak indir"
        >
          <Code className="w-3.5 h-3.5 text-slate-400" />
          <span>SVG</span>
        </button>

        {/* Current Slide PNG Export */}
        <button
          onClick={onExportPNG}
          disabled={isExporting}
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#F25822] to-[#ff6a38] hover:brightness-110 rounded-lg shadow-sm shadow-[#F25822]/20 transition disabled:opacity-50"
        >
          <ImageIcon className="w-4 h-4" />
          <span>{isExporting ? 'Oluşturuluyor...' : 'PNG İndir (HD)'}</span>
        </button>

        {/* Tümünü İndir */}
        <button
          onClick={onExportAllPNG}
          disabled={isExporting}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700/80 rounded-lg transition disabled:opacity-50"
          title="Tüm slaytları sırayla PNG olarak indirir"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Tümünü İndir</span>
        </button>
      </div>
    </header>
  );
}
