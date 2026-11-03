import React, { useState, useRef, useEffect } from 'react';
import HeaderNav from './components/HeaderNav';
import SlideEditor from './components/SlideEditor';
import CanvasPreview from './components/CanvasPreview';
import { 
  exportToCanvaCSV, 
  exportCanvasToPng, 
  exportCanvasToSvg 
} from './utils/exportUtils';
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw
} from 'lucide-react';

const AUTHENTIC_ARTSE_SLIDES = [
  {
    id: 'slide-1',
    theme: 'navy',
    category: 'SİGORTA REHBERİ',
    preheading: '',
    title: 'Kasko Poliçesi\nGerçekte Neyi Korur?',
    subtitle: 'Sadece aracın hasarını değil, beklenmedik kaza ve afet süreçlerinde finansal güvencenizi ve hareket kabiliyetinizi kesintisiz teminat altına alır.',
    highlightText: '',
    layoutType: 'metrics',
    stat1Number: '%100',
    stat1Text: 'Tam kapsamlı hasar ve parça onarım güvencesi',
    stat2Number: '7/24',
    stat2Text: 'Kesintisiz yol yardım ve ikame araç desteği',
    image: ''
  },
  {
    id: 'slide-2',
    theme: 'cream',
    category: 'KURUMSAL RİSK YÖNETİMİ',
    preheading: '',
    title: 'Sanayi ve Lojistikte\nKesintisiz Güvence',
    subtitle: 'Tedarik zincirinden ağır makine operasyonlarına kadar tüm operasyonel risklerinizi ARTSE uzmanlığıyla eksiksiz güvenceye alın.',
    highlightText: '',
    layoutType: 'f3_cover',
    image: 'bd92131b-9ef5-4341-911a-9dfd76d3e9a1.jpg'
  },
  {
    id: 'slide-3',
    theme: 'cream',
    category: 'SİGORTA SÖZLÜĞÜ',
    preheading: 'GENİŞLETİLMİŞ KASKO',
    title: 'Kaskoda alınabilecek ek\nteminatlar',
    subtitle: '',
    layoutType: 'list',
    listItems: [
      'Deprem, dolu, fırtına, yıldırım',
      'Sel ve su baskını',
      'Grev ve halk hareketi',
      'Terör ve sabotaj',
      'Anahtarla çalınma, kilit değişimi',
      'Orijinal parça seçimi'
    ],
    highlightText: '',
    image: ''
  },
  {
    id: 'slide-4',
    theme: 'navy',
    category: 'SİGORTA SÖZLÜĞÜ',
    preheading: 'İMM NEDİR?',
    title: 'Trafik limiti yetmezse aradaki\nfark size kalır.',
    subtitle: 'İhtiyari Mali Mesuliyet (İMM), zorunlu trafik sigortasının limitini aşan kısmı poliçede yazılı tutara kadar karşılıyor.',
    highlightText: '',
    layoutType: 'standard',
    image: ''
  },
  {
    id: 'slide-5',
    theme: 'cream',
    category: 'COĞRAFİ SINIR',
    title: 'Sınırı geçtiğiniz an teminat\nduruyor.',
    subtitle: 'Poliçeniz yalnızca Türkiye içinde çalışıyor; yurt dışı için ayrı teminat gerekiyor.',
    highlightText: '',
    layoutType: 'standard',
    image: ''
  },
  {
    id: 'slide-6',
    theme: 'navy',
    category: 'SİGORTA SÖZLÜĞÜ',
    preheading: 'SIRADAKİ ADIM',
    title: 'Poliçeniz sizi gerçekten koruyor\nmu?',
    subtitle: 'Eksik teminatlarla yola çıkmayın. Risklerinize hangi teminatların gerektiğini uzman ekibimizle konuşun.',
    highlightText: '',
    layoutType: 'cta',
    ctaText: 'Teklif için bize ulaşın',
    image: ''
  }
];

const DEFAULT_DESIGN_CONFIG = {
  titleFont: 'Zodiak',
  titleFontSize: 68,
  titleLineHeight: 1.08,
  titleWeight: '700',
  subtitleFont: 'Satoshi',
  subtitleFontSize: 34,
  subtitleLineHeight: 1.45,
  subtitleWeight: '400',
  accentLineWidth: 145,
  accentLineHeight: 6,
  accentLineColor: '#F37121',
  navyBgColor: '#00194C',
  headerBadgeSize: 29,
  headerBadgeTracking: 0.1,
  logoScale: 1.0,
  subtextScale: 1.15,
  customLogoUrl: '',
  websiteText: 'ARTSEBROKER.COM.TR',
  websiteFontSize: 26,
};

export default function App() {
  const [slides, setSlides] = useState(() => {
    const saved = localStorage.getItem('artse_slides_data_v3');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return AUTHENTIC_ARTSE_SLIDES;
  });

  const [designConfig, setDesignConfig] = useState(() => {
    const saved = localStorage.getItem('artse_design_config_v3');
    if (saved) {
      try {
        return { ...DEFAULT_DESIGN_CONFIG, ...JSON.parse(saved) };
      } catch (e) {
        console.error(e);
      }
    }
    return DEFAULT_DESIGN_CONFIG;
  });

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [aspectRatio, setAspectRatio] = useState('4:5'); // 1080x1350 is the official Instagram portrait ratio in canvas.json
  const [showSlideNumber, setShowSlideNumber] = useState(false);
  const [zoomScale, setZoomScale] = useState(0.48);
  const [isExporting, setIsExporting] = useState(false);
  const [exportMessage, setExportMessage] = useState(null);

  const canvasRef = useRef(null);
  const previewContainerRef = useRef(null);

  // Auto-save to localStorage
  useEffect(() => {
    localStorage.setItem('artse_slides_data_v3', JSON.stringify(slides));
  }, [slides]);

  useEffect(() => {
    localStorage.setItem('artse_design_config_v3', JSON.stringify(designConfig));
  }, [designConfig]);

  // Dynamic preview scaling
  useEffect(() => {
    const updateScale = () => {
      if (previewContainerRef.current) {
        const { clientWidth, clientHeight } = previewContainerRef.current;
        const targetH = aspectRatio === '4:5' ? 1350 : 1080;
        const targetW = 1080;
        
        const scaleW = (clientWidth - 80) / targetW;
        const scaleH = (clientHeight - 120) / targetH;
        const calculated = Math.min(scaleW, scaleH, 0.72);
        if (calculated > 0.2) {
          setZoomScale(Number(calculated.toFixed(2)));
        }
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [aspectRatio]);

  // Slide CRUD Actions
  const updateActiveSlide = (key, value) => {
    setSlides(prev => {
      const updated = [...prev];
      updated[activeSlideIndex] = {
        ...updated[activeSlideIndex],
        [key]: value
      };
      return updated;
    });
  };

  const updateDesignConfig = (key, value) => {
    setDesignConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetDesignConfig = () => {
    if (window.confirm('Tüm tipografi, renk ve logo ayarları resmi marka standartlarına sıfırlansın mı?')) {
      setDesignConfig(DEFAULT_DESIGN_CONFIG);
      showToast('Orijinal marka standartlarına sıfırlandı.');
    }
  };

  const addNewSlide = () => {
    const currentTheme = slides[activeSlideIndex]?.theme || 'cream';
    const nextTheme = currentTheme === 'cream' ? 'navy' : 'cream';

    const newSlide = {
      id: 'slide-' + Date.now(),
      theme: nextTheme,
      category: slides[activeSlideIndex]?.category || 'SİGORTA SÖZLÜĞÜ',
      preheading: '',
      title: 'Yeni Başlık',
      subtitle: 'Bu alana kurumsal içerik metninizi yazabilirsiniz.',
      highlightText: '',
      layoutType: 'standard',
      image: ''
    };
    setSlides(prev => [...prev, newSlide]);
    setActiveSlideIndex(slides.length);
  };

  const duplicateSlide = (index) => {
    const target = slides[index];
    const clone = {
      ...target,
      id: 'slide-' + Date.now(),
      title: target.title + ' (Kopya)'
    };
    const updated = [...slides];
    updated.splice(index + 1, 0, clone);
    setSlides(updated);
    setActiveSlideIndex(index + 1);
  };

  const deleteSlide = (index) => {
    if (slides.length <= 1) return;
    const updated = slides.filter((_, i) => i !== index);
    setSlides(updated);
    if (activeSlideIndex >= updated.length) {
      setActiveSlideIndex(updated.length - 1);
    }
  };

  const moveSlide = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= slides.length) return;
    const updated = [...slides];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setSlides(updated);
    setActiveSlideIndex(targetIndex);
  };

  const loadPresetTemplate = () => {
    if (window.confirm('Orijinal ARTSE Sigorta Sözlüğü serisi yüklensin mi?')) {
      setSlides(AUTHENTIC_ARTSE_SLIDES);
      setActiveSlideIndex(0);
      showToast('Orijinal ARTSE serisi yüklendi!');
    }
  };

  // Export handlers
  const handleExportCSV = () => {
    exportToCanvaCSV(slides, `artse_canva_bulk_${Date.now()}.csv`);
    showToast('Canva Bulk Create CSV indirildi!');
  };

  const handleExportPNG = async () => {
    try {
      setIsExporting(true);
      const filename = `artse_slayt_${activeSlideIndex + 1}_${Date.now()}.png`;
      await exportCanvasToPng(canvasRef, filename);
      showToast(`Slayt #${activeSlideIndex + 1} HD PNG olarak indirildi!`);
    } catch (err) {
      console.error(err);
      alert('PNG indirme hatası: ' + err.message);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportSVG = async () => {
    try {
      setIsExporting(true);
      const filename = `artse_slayt_${activeSlideIndex + 1}_${Date.now()}.svg`;
      await exportCanvasToSvg(canvasRef, filename);
      showToast(`Slayt #${activeSlideIndex + 1} SVG olarak indirildi!`);
    } catch (err) {
      console.error(err);
      alert('SVG indirme hatası: ' + err.message);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportAllPNG = async () => {
    try {
      setIsExporting(true);
      const originalIndex = activeSlideIndex;
      showToast('Tüm slaytlar hazırlanıyor...');

      for (let i = 0; i < slides.length; i++) {
        setActiveSlideIndex(i);
        await new Promise(r => setTimeout(r, 450));
        await exportCanvasToPng(canvasRef, `artse_slayt_${i + 1}_carousel.png`);
      }

      setActiveSlideIndex(originalIndex);
      showToast(`Toplam ${slides.length} slayt başarıyla indirildi!`);
    } catch (err) {
      console.error(err);
      alert('Toplu indirmede hata: ' + err.message);
    } finally {
      setIsExporting(false);
    }
  };

  const showToast = (msg) => {
    setExportMessage(msg);
    setTimeout(() => setExportMessage(null), 3500);
  };

  const currentSlide = slides[activeSlideIndex] || slides[0];
  const targetH = aspectRatio === '4:5' ? 1350 : 1080;
  const targetW = 1080;

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#0A0D14] text-slate-100 font-sans">
      {/* Header Bar */}
      <HeaderNav
        aspectRatio={aspectRatio}
        setAspectRatio={setAspectRatio}
        showSlideNumber={showSlideNumber}
        setShowSlideNumber={setShowSlideNumber}
        onExportCSV={handleExportCSV}
        onExportPNG={handleExportPNG}
        onExportSVG={handleExportSVG}
        onExportAllPNG={handleExportAllPNG}
        isExporting={isExporting}
      />

      {/* Main Workspace: Split View */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* SOL PANEL (Veri Girişi + Tipografi Kontrolleri) */}
        <div className="w-[430px] flex-shrink-0 h-full">
          <SlideEditor
            slides={slides}
            activeSlideIndex={activeSlideIndex}
            setActiveSlideIndex={setActiveSlideIndex}
            updateActiveSlide={updateActiveSlide}
            addNewSlide={addNewSlide}
            duplicateSlide={duplicateSlide}
            deleteSlide={deleteSlide}
            moveSlide={moveSlide}
            loadPresetTemplate={loadPresetTemplate}
            designConfig={designConfig}
            updateDesignConfig={updateDesignConfig}
            resetDesignConfig={resetDesignConfig}
          />
        </div>

        {/* SAĞ PANEL (Live Canvas & Ön İzleme Motoru) */}
        <div 
          ref={previewContainerRef}
          className="flex-1 h-full bg-[#07090E] relative flex flex-col items-center justify-center p-6 overflow-hidden select-none"
        >
          {/* İnce Arka Plan Izgarası */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* Toast Bildirimi */}
          {exportMessage && (
            <div className="absolute top-5 z-50 bg-[#162032] border border-[#F05A28]/40 text-slate-100 text-xs px-4 py-2.5 rounded-xl shadow-xl shadow-black/50 flex items-center gap-2 animate-bounce">
              <span className="w-2 h-2 rounded-full bg-[#F05A28]" />
              <span>{exportMessage}</span>
            </div>
          )}

          {/* Canvas Wrapper */}
          <div 
            className="relative flex items-center justify-center transition-transform duration-200"
            style={{
              width: `${targetW * zoomScale}px`,
              height: `${targetH * zoomScale}px`,
            }}
          >
            {/* 1080px Canvas Node */}
            <div 
              style={{
                width: `${targetW}px`,
                height: `${targetH}px`,
                transform: `scale(${zoomScale})`,
                transformOrigin: 'top left',
              }}
              className="absolute top-0 left-0 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] rounded-sm ring-1 ring-white/10"
            >
              <CanvasPreview
                ref={canvasRef}
                slide={currentSlide}
                aspectRatio={aspectRatio}
                currentSlideIndex={activeSlideIndex}
                totalSlides={slides.length}
                showSlideNumber={showSlideNumber}
                designConfig={designConfig}
              />
            </div>
          </div>

          {/* Canvas Alt Kontrol Barı (Navigasyon + Zoom) */}
          <div className="absolute bottom-6 flex items-center gap-4 bg-[#111622]/90 backdrop-blur-md border border-slate-800/80 px-4 py-2 rounded-2xl shadow-2xl z-30">
            {/* Önceki Slayt */}
            <button
              onClick={() => setActiveSlideIndex(prev => Math.max(0, prev - 1))}
              disabled={activeSlideIndex === 0}
              className="p-1.5 text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-300 rounded-lg transition"
              title="Önceki Slayt"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Slayt Sayacı */}
            <span className="text-xs font-semibold text-slate-300 tracking-wider font-mono">
              {activeSlideIndex + 1} / {slides.length}
            </span>

            {/* Sonraki Slayt */}
            <button
              onClick={() => setActiveSlideIndex(prev => Math.min(slides.length - 1, prev + 1))}
              disabled={activeSlideIndex === slides.length - 1}
              className="p-1.5 text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-300 rounded-lg transition"
              title="Sonraki Slayt"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="w-[1px] h-4 bg-slate-800 mx-1" />

            {/* Zoom Kontrolleri */}
            <button
              onClick={() => setZoomScale(s => Math.max(0.2, Number((s - 0.05).toFixed(2))))}
              className="p-1.5 text-slate-400 hover:text-slate-200 transition"
              title="Küçült"
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            <span className="text-[11px] font-mono text-slate-400 w-12 text-center">
              {Math.round(zoomScale * 100)}%
            </span>

            <button
              onClick={() => setZoomScale(s => Math.min(1.0, Number((s + 0.05).toFixed(2))))}
              className="p-1.5 text-slate-400 hover:text-slate-200 transition"
              title="Büyüt"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            <button
              onClick={() => setZoomScale(0.48)}
              className="p-1.5 text-slate-400 hover:text-slate-200 transition"
              title="Sıfırla"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
