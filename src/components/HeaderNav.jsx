import React from 'react';
import { 
  Download, 
  FileSpreadsheet, 
  Image as ImageIcon, 
  Maximize2, 
  Layers,
  CheckCircle2,
  Save,
  FolderOpen,
  Archive,
  Compass
} from 'lucide-react';

export default function HeaderNav({
  aspectRatio,
  setAspectRatio,
  showSlideNumber,
  setShowSlideNumber,
  showGuides,
  setShowGuides,
  onExportCSV,
  onExportPNG,
  onExportZip,
  onSaveProject,
  onLoadProject,
  isExporting
}) {
  return (
    <header className="h-16 border-b border-slate-800 bg-[#0B0F17] px-6 flex items-center justify-between z-20">
      {/* Sol Logo & Proje Yönetimi */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#F37121] to-[#B45115] flex items-center justify-center font-bold text-white shadow-md shadow-[#F37121]/20">
            A
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-100 tracking-wider text-sm">
                ARTSE
              </span>
              <span className="text-xs text-slate-400 font-light">| Carousel Studio v4</span>
            </div>
          </div>
        </div>

        {/* Proje Yedekleme Düğmeleri */}
        <div className="flex items-center gap-1.5 ml-4 pl-4 border-l border-slate-800">
          <button
            onClick={onSaveProject}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-xs text-slate-200 transition"
            title="Projeyi JSON dosyası olarak bilgisayarına kaydet (Ctrl+S)"
          >
            <Save className="w-3.5 h-3.5 text-sky-400" />
            <span>Projeyi Kaydet</span>
          </button>
          <label className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-slate-700 bg-slate-900 hover:bg-slate-800 text-xs text-slate-200 cursor-pointer transition">
            <FolderOpen className="w-3.5 h-3.5 text-amber-400" />
            <span>Proje Aç</span>
            <input
              type="file"
              accept=".json"
              onChange={onLoadProject}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Orta Kontroller (Format Seçimi & Kılavuz) */}
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
            1:1 Kare
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
          onClick={() => setShowGuides(!showGuides)}
          className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium transition flex items-center gap-1.5 ${
            showGuides
              ? 'bg-emerald-950/40 border-emerald-500/60 text-emerald-300'
              : 'bg-transparent border-slate-800 text-slate-400'
          }`}
          title="Güvenli alan ve kenar boşluğu kılavuz çizgilerini göster/gizle"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Kılavuz</span>
        </button>

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

        {/* Current Slide PNG Export */}
        <button
          onClick={onExportPNG}
          disabled={isExporting}
          className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-[#F37121] to-[#ff7a29] hover:brightness-110 rounded-lg shadow-sm shadow-[#F37121]/20 transition disabled:opacity-50"
        >
          <ImageIcon className="w-4 h-4" />
          <span>{isExporting ? 'Oluşturuluyor...' : 'PNG İndir (HD)'}</span>
        </button>

        {/* ZIP ile Tümünü İndir */}
        <button
          onClick={onExportZip}
          disabled={isExporting}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-sky-300 bg-sky-950/60 hover:bg-sky-900/60 border border-sky-600/50 rounded-lg transition disabled:opacity-50 shadow-sm"
          title="Tüm slaytları 2160x2700 HD kalitede tek bir ZIP paketi olarak indirir"
        >
          <Archive className="w-4 h-4 text-sky-400" />
          <span>Tümünü ZIP İndir</span>
        </button>
      </div>
    </header>
  );
}
