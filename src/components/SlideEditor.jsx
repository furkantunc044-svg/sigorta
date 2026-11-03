import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Copy, 
  MoveUp, 
  MoveDown, 
  Palette, 
  Type, 
  Highlighter, 
  Tag, 
  Image as ImageIcon,
  Sparkles,
  Sliders,
  FileText,
  Upload,
  RefreshCw,
  ListOrdered,
  MousePointerClick
} from 'lucide-react';

export default function SlideEditor({
  slides,
  activeSlideIndex,
  setActiveSlideIndex,
  updateActiveSlide,
  addNewSlide,
  duplicateSlide,
  deleteSlide,
  moveSlide,
  loadPresetTemplate,
  designConfig,
  updateDesignConfig,
  resetDesignConfig
}) {
  const [activeTab, setActiveTab] = useState('content');
  const currentSlide = slides[activeSlideIndex] || slides[0];

  const themes = [
    { id: 'cream', name: 'Krem (Açık #FAF9F6)', bg: 'bg-[#FAF9F6]', border: 'border-slate-300', text: 'text-slate-900' },
    { id: 'navy', name: 'Lacivert (Derin #00194C)', bg: 'bg-[#00194C]', border: 'border-blue-900', text: 'text-white' },
    { id: 'anthracite', name: 'Kart Laciverti (#003E73)', bg: 'bg-[#003E73]', border: 'border-blue-700', text: 'text-white' },
  ];

  const fontOptions = [
    { id: 'Zodiak', label: 'Zodiak (Resmi Başlık - Serif)', sample: 'Serif' },
    { id: 'Satoshi', label: 'Satoshi (Resmi Gövde - Sans)', sample: 'Sans' },
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateActiveSlide('image', event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateDesignConfig('customLogoUrl', event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#111622] border-r border-slate-800/80">
      {/* Üst Sekmeler */}
      <div className="p-3 border-b border-slate-800/80 bg-[#0d121c] flex items-center gap-2">
        <button
          onClick={() => setActiveTab('content')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition ${
            activeTab === 'content'
              ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-[#F05A28]" />
          <span>Slayt İçeriği</span>
        </button>

        <button
          onClick={() => setActiveTab('typography')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-semibold transition ${
            activeTab === 'typography'
              ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sliders className="w-3.5 h-3.5 text-[#F05A28]" />
          <span>Tipografi & Logo</span>
        </button>
      </div>

      {/* SEKME 1: SLAYT İÇERİĞİ */}
      {activeTab === 'content' && (
        <div className="flex flex-col h-full overflow-hidden">
          {/* Slaytlar Listesi Barı */}
          <div className="p-3.5 border-b border-slate-800/60 bg-[#0f1420]">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Slaytlar ({slides.length})
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={loadPresetTemplate}
                  title="Resmi Sözlük Şablonunu Yükle"
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 rounded-md transition"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Örnek Şablon</span>
                </button>
                <button
                  onClick={addNewSlide}
                  title="Yeni Slayt Ekle"
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-white bg-[#F05A28] hover:bg-[#d94916] rounded-md shadow-sm transition"
                >
                  <Plus className="w-3 h-3" />
                  <span>Ekle</span>
                </button>
              </div>
            </div>

            {/* Slayt Numaraları */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
              {slides.map((slide, idx) => {
                const isActive = idx === activeSlideIndex;
                return (
                  <button
                    key={slide.id || idx}
                    onClick={() => setActiveSlideIndex(idx)}
                    className={`flex-shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border transition-all ${
                      isActive
                        ? 'bg-slate-800 text-white border-[#F05A28] shadow-sm'
                        : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        slide.theme === 'cream'
                          ? 'bg-[#FAF9F6]'
                          : slide.theme === 'navy'
                          ? 'bg-[#00194C]'
                          : 'bg-[#003E73]'
                      }`}
                    />
                    <span>{idx + 1}</span>
                    {slide.isCopy && (
                      <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1 rounded">Kopya</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Alanı */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Sıralama & Yönetim */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                Slayt #{activeSlideIndex + 1}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => moveSlide(activeSlideIndex, -1)}
                  disabled={activeSlideIndex === 0}
                  title="Yukarı Taşı"
                  className="p-1 text-slate-400 hover:text-slate-100 disabled:opacity-30 transition"
                >
                  <MoveUp className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => moveSlide(activeSlideIndex, 1)}
                  disabled={activeSlideIndex === slides.length - 1}
                  title="Aşağı Taşı"
                  className="p-1 text-slate-400 hover:text-slate-100 disabled:opacity-30 transition"
                >
                  <MoveDown className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => duplicateSlide(activeSlideIndex)}
                  title="Slaytı Çoğalt"
                  className="p-1 text-slate-400 hover:text-slate-100 transition"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                {slides.length > 1 && (
                  <button
                    onClick={() => deleteSlide(activeSlideIndex)}
                    title="Slaytı Sil"
                    className="p-1 text-red-400 hover:text-red-300 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Tema Seçici */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-slate-300 mb-1.5">
                <Palette className="w-3.5 h-3.5 text-[#F05A28]" />
                <span>Arka Plan Teması</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {themes.map((t) => {
                  const isSelected = (currentSlide.theme || 'cream') === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => updateActiveSlide('theme', t.id)}
                      className={`p-2 rounded-lg border text-left flex flex-col items-start gap-1 transition-all ${
                        isSelected
                          ? 'border-[#F05A28] bg-slate-800/80 ring-1 ring-[#F05A28]'
                          : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                      }`}
                    >
                      <div className={`w-full h-4 rounded ${t.bg} border ${t.border}`} />
                      <span className="text-[10px] font-medium text-slate-300 leading-tight">
                        {t.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Düzen / Format Türü (Standart vs Maddeli Liste vs CTA Butonlu) */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-slate-300 mb-1.5">
                <Sliders className="w-3.5 h-3.5 text-[#F05A28]" />
                <span>İçerik Düzeni</span>
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'standard', label: 'Standart', icon: FileText },
                  { id: 'metrics', label: 'Vurgu Rakamlı', icon: Sliders },
                  { id: 'list', label: 'Maddeli', icon: ListOrdered },
                  { id: 'f3_cover', label: 'F3 Foto Kapak', icon: ImageIcon },
                  { id: 'f2_closing', label: 'F2 Foto Kapanış', icon: ImageIcon },
                  { id: 'comparison', label: 'Karşılaştırma', icon: Sliders },
                  { id: 'qa_takeaway', label: 'Soru-Cevap', icon: FileText },
                  { id: 'single_stat', label: 'Tek Kahraman', icon: Sliders },
                  { id: 'quote', label: 'Alıntı', icon: FileText },
                  { id: 'steps', label: 'Adım Listesi', icon: ListOrdered },
                  { id: 'cta', label: 'Eyleme Çağrı', icon: MousePointerClick },
                ].map((lt) => {
                  const isSelected = (currentSlide.layoutType || 'standard') === lt.id;
                  const Icon = lt.icon;
                  return (
                    <button
                      key={lt.id}
                      onClick={() => {
                        updateActiveSlide('layoutType', lt.id);
                        if (lt.id === 'list' && (!currentSlide.listItems || currentSlide.listItems.length === 0)) {
                          updateActiveSlide('listItems', [
                            'Deprem, dolu, fırtına, yıldırım',
                            'Sel ve su baskını',
                            'Grev ve halk hareketi',
                            'Terör ve sabotaj'
                          ]);
                        }
                        if (lt.id === 'cta' && !currentSlide.ctaText) {
                          updateActiveSlide('ctaText', 'Teklif için bize ulaşın');
                        }
                        if (lt.id === 'metrics') {
                          if (!currentSlide.stat1Number) updateActiveSlide('stat1Number', '%100');
                          if (!currentSlide.stat1Text) updateActiveSlide('stat1Text', 'Tam kapsamlı hasar ve parça onarım güvencesi');
                          if (!currentSlide.stat2Number) updateActiveSlide('stat2Number', '7/24');
                          if (!currentSlide.stat2Text) updateActiveSlide('stat2Text', 'Kesintisiz yol yardım ve ikame araç desteği');
                        }
                        if (lt.id === 'f2_closing') {
                          if (!currentSlide.image) updateActiveSlide('image', '/photos/1b326e82-8c46-43fb-979c-dd9554887dcb.jpg');
                        }
                        if (lt.id === 'comparison') {
                          if (!currentSlide.col1Title) updateActiveSlide('col1Title', 'STANDART TEMİNAT');
                          if (!currentSlide.col1Body) updateActiveSlide('col1Body', 'Temel yasal limitler kapsamında sınırlı koruma sağlar.');
                          if (!currentSlide.col2Title) updateActiveSlide('col2Title', 'GENİŞLETİLMİŞ TEMİNAT');
                          if (!currentSlide.col2Body) updateActiveSlide('col2Body', 'Limitsiz İMM ve orijinal parça garantisiyle tam koruma sunar.');
                        }
                        if (lt.id === 'single_stat') {
                          if (!currentSlide.stat1Number) updateActiveSlide('stat1Number', '48 SAAT');
                        }
                        if (lt.id === 'quote') {
                          if (!currentSlide.quoteAuthor) updateActiveSlide('quoteAuthor', 'ARTSE Risk Danışmanlığı');
                        }
                      }}
                      className={`py-1.5 px-2 rounded-lg border text-xs font-medium flex items-center justify-center gap-1 transition ${
                        (currentSlide.layoutType || 'standard') === lt.id
                          ? 'bg-[#F05A28]/20 border-[#F05A28] text-white shadow-sm'
                          : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Icon className="w-3 h-3 text-[#F05A28]" />
                      <span>{lt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Üst Rozet / Kategori */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-slate-300 mb-1">
                <Tag className="w-3.5 h-3.5 text-[#F05A28]" />
                <span>Kategori Etiketi (En Üst)</span>
              </label>
              <input
                type="text"
                value={currentSlide.category || ''}
                onChange={(e) => updateActiveSlide('category', e.target.value)}
                placeholder="Örn: SİGORTA SÖZLÜĞÜ"
                className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700/80 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#F05A28]"
              />
            </div>

            {/* Turuncu Preheading (Üst Başlık) */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-slate-300 mb-1">
                <Tag className="w-3.5 h-3.5 text-[#C85A17]" />
                <span>Turuncu Üst Başlık (Preheading)</span>
              </label>
              <input
                type="text"
                value={currentSlide.preheading || ''}
                onChange={(e) => updateActiveSlide('preheading', e.target.value)}
                placeholder="Örn: GENİŞLETİLMİŞ KASKO, SIRADAKİ ADIM"
                className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700/80 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#F05A28]"
              />
            </div>

            {/* Ana Başlık */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-slate-300 mb-1">
                <Type className="w-3.5 h-3.5 text-[#F05A28]" />
                <span>Ana Başlık (Zodiak Serif)</span>
              </label>
              <textarea
                rows={3}
                value={currentSlide.title || ''}
                onChange={(e) => updateActiveSlide('title', e.target.value)}
                placeholder="Örn: Kaskoda alınabilecek ek teminatlar"
                className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700/80 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#F05A28] font-serif resize-y"
              />
            </div>

            {/* MADDELİ DÜZEN İÇİN GİRİŞ */}
            {currentSlide.layoutType === 'list' ? (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-300">
                    <ListOrdered className="w-3.5 h-3.5 text-[#F05A28]" />
                    <span>Maddeler (Her satıra bir madde)</span>
                  </label>
                </div>
                <textarea
                  rows={6}
                  value={
                    Array.isArray(currentSlide.listItems) 
                      ? currentSlide.listItems.join('\n') 
                      : (currentSlide.listItems || '')
                  }
                  onChange={(e) => updateActiveSlide('listItems', e.target.value.split('\n'))}
                  placeholder={`Deprem, dolu, fırtına, yıldırım\nSel ve su baskını\nGrev ve halk hareketi\nTerör ve sabotaj`}
                  className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700/80 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#F05A28] resize-y font-mono"
                />
              </div>
            ) : (
              /* STANDART PARAGRAF GİRİŞİ */
              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-slate-300 mb-1">
                  <Type className="w-3.5 h-3.5 text-[#F05A28]" />
                  <span>Açıklama / Gövde Metni (Satoshi)</span>
                </label>
                <textarea
                  rows={4}
                  value={currentSlide.subtitle || ''}
                  onChange={(e) => updateActiveSlide('subtitle', e.target.value)}
                  placeholder="Metin..."
                  className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700/80 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#F05A28] resize-y"
                />
              </div>
            )}

            {/* CTA BUTON METNİ */}
            {currentSlide.layoutType === 'cta' && (
              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-slate-300 mb-1">
                  <MousePointerClick className="w-3.5 h-3.5 text-[#F05A28]" />
                  <span>Turuncu Buton Metni</span>
                </label>
                <input
                  type="text"
                  value={currentSlide.ctaText || 'Teklif için bize ulaşın'}
                  onChange={(e) => updateActiveSlide('ctaText', e.target.value)}
                  placeholder="Teklif için bize ulaşın"
                  className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700/80 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#F05A28]"
                />
              </div>
            )}

            {/* VURGU RAKAMLARI (METRICS LAYOUT İÇİN) */}
            {currentSlide.layoutType === 'metrics' && (
              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-lg space-y-3">
                <span className="text-xs font-semibold text-slate-300">Vurgu Bloğu Ayarları</span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">1. Rakam / İfade</label>
                    <input
                      type="text"
                      value={currentSlide.stat1Number || '%100'}
                      onChange={(e) => updateActiveSlide('stat1Number', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">2. Rakam / İfade</label>
                    <input
                      type="text"
                      value={currentSlide.stat2Number || '7/24'}
                      onChange={(e) => updateActiveSlide('stat2Number', e.target.value)}
                      className="w-full px-2.5 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded text-slate-100"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">1. Rakam Açıklaması</label>
                  <input
                    type="text"
                    value={currentSlide.stat1Text || ''}
                    onChange={(e) => updateActiveSlide('stat1Text', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded text-slate-100"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">2. Rakam Açıklaması</label>
                  <input
                    type="text"
                    value={currentSlide.stat2Text || ''}
                    onChange={(e) => updateActiveSlide('stat2Text', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded text-slate-100"
                  />
                </div>
              </div>
            )}

            {/* Turuncu Vurgu Kelimesi */}
            {currentSlide.layoutType !== 'list' && (
              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-slate-300 mb-1">
                  <Highlighter className="w-3.5 h-3.5 text-[#F05A28]" />
                  <span>Turuncu Vurgulanacak Kelime/Tarih</span>
                </label>
                <input
                  type="text"
                  value={currentSlide.highlightText || ''}
                  onChange={(e) => updateActiveSlide('highlightText', e.target.value)}
                  placeholder="Örn: 5-11 Ekim Sigorta Haftası"
                  className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700/80 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#F05A28]"
                />
              </div>
            )}

            {/* F3 Foto Kapak veya F2 Foto Kapanış için Fotoğraf ve Odak Kontrolleri */}
            {(currentSlide.layoutType === 'f3_cover' || currentSlide.layoutType === 'f2_closing') && (
              <div className="p-3 bg-slate-900/90 border border-slate-800 rounded-lg space-y-3">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-200">
                  <ImageIcon className="w-3.5 h-3.5 text-[#F05A28]" />
                  <span>{currentSlide.layoutType === 'f3_cover' ? 'F3 Kapak Fotoğrafı (Üst 520px)' : 'F2 Kapanış Fotoğrafı (Alt 384px)'}</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={currentSlide.image || ''}
                    onChange={(e) => updateActiveSlide('image', e.target.value)}
                    placeholder="/photos/... veya görsel URL"
                    className="flex-1 px-3 py-1.5 text-xs bg-slate-950 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#F05A28]"
                  />
                  <label className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 rounded-lg cursor-pointer border border-slate-700 transition flex items-center">
                    <span>Yükle</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Hazır Endüstriyel Stok Seçici */}
                <div>
                  <span className="text-[11px] text-slate-400 block mb-1">Hazır Endüstriyel Fotoğraflar:</span>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { name: 'Tesis 1', url: '/bd92131b-9ef5-4341-911a-9dfd76d3e9a1.jpg', fx: 50, fy: 42 },
                      { name: 'Liman 2', url: '/photos/1b326e82-8c46-43fb-979c-dd9554887dcb.jpg', fx: 50, fy: 50 },
                      { name: 'Depo 3', url: '/photos/4338ae67-2a03-4d2d-97b4-3fa44ee5a3c9.jpg', fx: 50, fy: 40 },
                      { name: 'Üretim 4', url: '/photos/624d0258-dd88-4838-9d0e-acd16dfc327b.jpg', fx: 50, fy: 60 },
                    ].map((stok, sidx) => (
                      <button
                        key={sidx}
                        type="button"
                        onClick={() => {
                          updateActiveSlide('image', stok.url);
                          updateActiveSlide('focusX', stok.fx);
                          updateActiveSlide('focusY', stok.fy);
                        }}
                        className="py-1 px-1 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded text-[10px] text-slate-200 truncate"
                      >
                        {stok.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Yatay ve Dikey Odak (Focus X/Y) ve Yakınlaştırma (Zoom) Kaydırıcıları */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Odak X: {currentSlide.focusX ?? 50}%</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={currentSlide.focusX ?? 50}
                      onChange={(e) => updateActiveSlide('focusX', Number(e.target.value))}
                      className="w-full accent-[#F05A28]"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Odak Y: {currentSlide.focusY ?? (currentSlide.layoutType === 'f3_cover' ? 42 : 82)}%</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={currentSlide.focusY ?? (currentSlide.layoutType === 'f3_cover' ? 42 : 82)}
                      onChange={(e) => updateActiveSlide('focusY', Number(e.target.value))}
                      className="w-full accent-[#F05A28]"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block">Zoom: {currentSlide.imageZoom ?? 1.0}x</span>
                    <input
                      type="range"
                      min="1.0"
                      max="2.0"
                      step="0.05"
                      value={currentSlide.imageZoom ?? 1.0}
                      onChange={(e) => updateActiveSlide('imageZoom', Number(e.target.value))}
                      className="w-full accent-[#F05A28]"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SEKME 2: TİPOGRAFİ, FONT BOYUTLARI VE LOGO AYARLARI */}
      {activeTab === 'typography' && (
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">
              Global Tipografi & Renkler
            </span>
            <button
              onClick={resetDesignConfig}
              className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-amber-400 transition"
              title="Varsayılan orijinal marka ayarlarına dön"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Sıfırla</span>
            </button>
          </div>

          {/* 1. Başlık Font Seçimi */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Başlık Font Ailesi
            </label>
            <select
              value={designConfig.titleFont}
              onChange={(e) => updateDesignConfig('titleFont', e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-[#F05A28]"
            >
              {fontOptions.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>

          {/* 2. Başlık Boyutu Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
              <span>Başlık Font Boyutu</span>
              <span className="font-mono text-[#F05A28]">{designConfig.titleFontSize}px</span>
            </div>
            <input
              type="range"
              min="48"
              max="96"
              step="2"
              value={designConfig.titleFontSize}
              onChange={(e) => updateDesignConfig('titleFontSize', Number(e.target.value))}
              className="w-full accent-[#F05A28] cursor-pointer"
            />
          </div>

          {/* 3. Başlık Satır Yüksekliği */}
          <div>
            <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
              <span>Başlık Satır Aralığı</span>
              <span className="font-mono text-slate-400">{designConfig.titleLineHeight}</span>
            </div>
            <input
              type="range"
              min="1.0"
              max="1.4"
              step="0.05"
              value={designConfig.titleLineHeight}
              onChange={(e) => updateDesignConfig('titleLineHeight', Number(e.target.value))}
              className="w-full accent-[#F05A28] cursor-pointer"
            />
          </div>

          {/* 4. Alt Metin Font Boyutu Slider (Min 32px kuralı) */}
          <div>
            <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
              <span>Açıklama Metin Boyutu</span>
              <span className="font-mono text-[#F05A28]">{designConfig.subtitleFontSize}px</span>
            </div>
            <input
              type="range"
              min="32"
              max="40"
              step="1"
              value={designConfig.subtitleFontSize}
              onChange={(e) => updateDesignConfig('subtitleFontSize', Number(e.target.value))}
              className="w-full accent-[#F05A28] cursor-pointer"
            />
          </div>

          {/* 5. Alt Metin Satır Aralığı */}
          <div>
            <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
              <span>Açıklama Satır Aralığı</span>
              <span className="font-mono text-slate-400">{designConfig.subtitleLineHeight}</span>
            </div>
            <input
              type="range"
              min="1.3"
              max="2.0"
              step="0.05"
              value={designConfig.subtitleLineHeight}
              onChange={(e) => updateDesignConfig('subtitleLineHeight', Number(e.target.value))}
              className="w-full accent-[#F05A28] cursor-pointer"
            />
          </div>

          {/* 6. Turuncu Çizgi Boyutu (Varsayılan 145x6) */}
          <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-800/60">
            <div>
              <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
                <span>Çizgi Genişliği</span>
                <span className="font-mono text-slate-400">{designConfig.accentLineWidth}px</span>
              </div>
              <input
                type="range"
                min="40"
                max="180"
                step="4"
                value={designConfig.accentLineWidth}
                onChange={(e) => updateDesignConfig('accentLineWidth', Number(e.target.value))}
                className="w-full accent-[#F05A28] cursor-pointer"
              />
            </div>
            <div>
              <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
                <span>Çizgi Kalınlığı</span>
                <span className="font-mono text-slate-400">{designConfig.accentLineHeight}px</span>
              </div>
              <input
                type="range"
                min="3"
                max="12"
                step="1"
                value={designConfig.accentLineHeight}
                onChange={(e) => updateDesignConfig('accentLineHeight', Number(e.target.value))}
                className="w-full accent-[#F05A28] cursor-pointer"
              />
            </div>
          </div>

          {/* 7. LOGO AYARLARI */}
          <div className="pt-3 border-t border-slate-800/60 space-y-3">
            <span className="block text-xs font-bold text-slate-200">
              Resmi Logo Seçenekleri
            </span>

            {/* Logo Boyut Slider: Sınırlandırılmış aralık 0.7 - 1.4 */}
            <div>
              <div className="flex justify-between items-center text-xs font-medium text-slate-300 mb-1">
                <span>Ana Logo Büyüklüğü</span>
                <span className="font-mono text-[#F05A28]">{Math.round(designConfig.logoScale * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.7"
                max="1.4"
                step="0.05"
                value={designConfig.logoScale}
                onChange={(e) => updateDesignConfig('logoScale', Number(e.target.value))}
                className="w-full accent-[#F05A28] cursor-pointer"
              />
            </div>

            {/* Gerçekçi Logo Bilgisi */}
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
              <p className="text-xs text-sky-400 font-medium">
                Logo: ARTSE resmi PNG (1500×357, şeffaf).
              </p>
              <p className="text-[11px] text-slate-400 mt-1">
                2x PNG çıktısında yüksek çözünürlükle net basılır.
              </p>
            </div>

            {/* Gelişmiş Logo Yükleme Alanı */}
            <details className="text-xs text-slate-400">
              <summary className="cursor-pointer hover:text-slate-200 py-1">Gelişmiş: Harici Logo Yükle</summary>
              <div className="mt-2 p-2.5 bg-slate-950 border border-amber-500/30 rounded text-amber-200/90 text-[11px]">
                ⚠️ Marka dışı logo yüklemek serinin kurumsal tutarlılığını bozar.
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="text-xs text-slate-300"
                  />
                  {designConfig.customLogoUrl && (
                    <button
                      onClick={() => updateDesignConfig('customLogoUrl', '')}
                      className="px-2.5 py-1 text-xs text-red-400 hover:bg-red-500/10 border border-red-500/20 rounded transition"
                    >
                      Kaldır
                    </button>
                  )}
                </div>
              </div>
            </details>
          </div>

            {/* Web Sitesi Metni */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Alt Sağ Web Adresi
              </label>
              <input
                type="text"
                value={designConfig.websiteText}
                onChange={(e) => updateDesignConfig('websiteText', e.target.value)}
                placeholder="ARTSEBROKER.COM.TR"
                className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-[#F05A28]"
              />
            </div>
        </div>
      )}
    </div>
  );
}
