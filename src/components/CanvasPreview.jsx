import React, { forwardRef } from 'react';
import ArtseLogo from './ArtseLogo';

/**
 * High-fidelity Instagram Carousel Canvas
 * Pixel-accurate to official ARTSE Sigorta Brokerliği A.Ş. brand standards
 * Standard dimensions: 1080x1350 (4:5) or 1080x1080 (1:1)
 * Outer Margins: exactly 85px left/right
 * Footer: exactly 114px bottom strip with vertically aligned logo and web address
 */
const CanvasPreview = forwardRef(({ 
  slide, 
  aspectRatio = '4:5', 
  currentSlideIndex = 0, 
  totalSlides = 1, 
  showSlideNumber = false,
  designConfig = {}
}, ref) => {
  const isPortrait = aspectRatio === '4:5';
  const canvasHeight = isPortrait ? 1350 : 1080;
  const canvasWidth = 1080;

  const theme = slide.theme || 'cream';

  // Config with safe fallbacks
  const {
    titleFont = 'Zodiak',
    titleFontSize = 66,
    titleLineHeight = 1.14,
    titleWeight = '700',
    subtitleFont = 'Satoshi',
    subtitleFontSize = 28,
    subtitleLineHeight = 1.58,
    subtitleWeight = '400',
    accentLineWidth = 84,
    accentLineHeight = 6,
    accentLineColor = '#F05A28',
    headerBadgeSize = 24,
    headerBadgeTracking = 0.22,
    logoScale = 1.0,
    subtextScale = 1.15, // enhanced clarity for "Sigorta Brokerliği A.Ş."
    customLogoUrl = '',
    websiteText = 'ARTSEBROKER.COM.TR',
    websiteFontSize = 21,
    navyBgColor = '#00194C',
  } = designConfig;

  // Exact Brand Color Palette directly sampled from official image files
  const themeStyles = {
    cream: {
      bg: '#FAF9F6', // Off-white/cream paper
      headerText: '#00194C',
      divider: 'rgba(0, 25, 76, 0.12)',
      preheading: '#B45115', // Brand compliant accessible dark orange (4.83:1 on cream)
      title: '#00194C',
      subtitle: '#334E68',
      listItemText: '#00194C',
      listDivider: 'rgba(0, 25, 76, 0.12)',
      footerWeb: '#00194C',
      logoVariant: 'light', // artse-official-light.png on white/cream
      badgeColor: '#00194C',
      ctaBg: '#F37121',
      ctaText: '#00194C', // Dark navy text on orange background (accessible)
      statNumber: '#B45115', // Accessible dark orange for numbers on cream
      statDesc: '#334E68',
      highlightColor: '#B45115'
    },
    navy: {
      bg: '#00194C', // Exact deep navy
      headerText: '#B3CCFF',
      divider: 'rgba(255, 255, 255, 0.14)',
      preheading: '#F8AB7C',
      title: '#FFFFFF',
      subtitle: '#B3CCFF',
      listItemText: '#FFFFFF',
      listDivider: 'rgba(255, 255, 255, 0.14)',
      footerWeb: '#B3CCFF', // Light blue URL
      logoVariant: 'dark', // artse-official-dark.png on navy
      badgeColor: '#B3CCFF',
      ctaBg: '#F37121',
      ctaText: '#00194C', // Dark navy text on orange button
      statNumber: '#F8AB7C', // Peach accent number on dark
      statDesc: '#B3CCFF',
      highlightColor: '#F8AB7C'
    },
    anthracite: {
      bg: '#003E73', // Secondary brand blue (Kart Laciverti)
      headerText: '#B3CCFF',
      divider: 'rgba(255, 255, 255, 0.14)',
      preheading: '#F8AB7C',
      title: '#FFFFFF',
      subtitle: '#B3CCFF',
      listItemText: '#FFFFFF',
      listDivider: 'rgba(255, 255, 255, 0.14)',
      footerWeb: '#B3CCFF',
      logoVariant: 'dark',
      badgeColor: '#B3CCFF',
      ctaBg: '#F37121',
      ctaText: '#00194C',
      statNumber: '#F8AB7C',
      statDesc: '#B3CCFF',
      highlightColor: '#F8AB7C'
    }
  };

  const currentTheme = themeStyles[theme] || themeStyles.cream;

  // Render subtitle with highlighted keywords
  const renderSubtitle = () => {
    const text = slide.subtitle || '';
    const highlight = slide.highlightText?.trim();

    if (!highlight || !text.toLowerCase().includes(highlight.toLowerCase())) {
      return text;
    }

    const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) => 
      regex.test(part) ? (
        <span key={i} className="font-semibold" style={{ color: currentTheme.highlightColor || accentLineColor }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const listItems = slide.listItems 
    ? (Array.isArray(slide.listItems) ? slide.listItems : slide.listItems.split('\n').filter(Boolean))
    : [];

  const isF3Cover = slide.layoutType === 'f3_cover';
  const isF2Closing = slide.layoutType === 'f2_closing';

  // Slayt özel başlık puntosu veya global ayar
  const effectiveTitleSize = slide.customTitleSize || titleFontSize;

  return (
    <div
      ref={ref}
      id="export-canvas-node"
      style={{
        width: `${canvasWidth}px`,
        height: `${canvasHeight}px`,
        backgroundColor: isF3Cover ? '#FAF9F6' : currentTheme.bg,
      }}
      className="relative flex flex-col justify-between px-[84px] pt-[56px] pb-0 select-none overflow-hidden transition-colors duration-300"
    >
      {/* Kılavuz Katmanı (Yalnızca editörde görüntülenir, PNG/dışa aktarmada gizlenir) */}
      {slide.showGuides && (
        <div className="absolute inset-0 pointer-events-none z-50">
          {/* Sol/Sağ 84px Marjin */}
          <div className="absolute top-0 bottom-0 left-[84px] w-[1px] bg-red-500/40" />
          <div className="absolute top-0 bottom-0 right-[84px] w-[1px] bg-red-500/40" />
          {/* Instagram 1:1 Profil Izgarası Güvenli Alanı: y=135 ve y=1215 */}
          <div className="absolute left-0 right-0 top-[135px] h-[1px] bg-emerald-400/50" />
          <div className="absolute left-0 right-0 top-[1215px] h-[1px] bg-emerald-400/50" />
          {/* F3 Üst 520px Sınırı */}
          {isF3Cover && (
            <div className="absolute left-0 right-0 top-[520px] h-[1px] bg-amber-400/60" />
          )}
          {/* F2 Alt Bant Sınırı: y=812 ve y=1196 */}
          {isF2Closing && (
            <>
              <div className="absolute left-0 right-0 top-[812px] h-[1px] bg-amber-400/60" />
              <div className="absolute left-0 right-0 top-[1196px] h-[1px] bg-amber-400/60" />
            </>
          )}
        </div>
      )}

      {/* F3 Fotoğraflı Kart: Üst 520 px Tam Genişlik Kadraj */}
      {isF3Cover && (slide.image || '/bd92131b-9ef5-4341-911a-9dfd76d3e9a1.jpg') && (
        <div 
          className="absolute top-0 left-0 w-full h-[520px] overflow-hidden pointer-events-none"
        >
          <img 
            src={slide.image || '/bd92131b-9ef5-4341-911a-9dfd76d3e9a1.jpg'} 
            alt="Endüstriyel Sahne" 
            className="w-full h-full object-cover" 
            style={{ 
              objectPosition: `${slide.focusX ?? 50}% ${slide.focusY ?? 42}%`,
              transform: `scale(${slide.imageZoom ?? 1.0})`
            }}
          />
        </div>
      )}

      {/* F2 Fotoğraflı Kart: Alt Bant y=812-1196 (384 px yükseklik), tam genişlik */}
      {isF2Closing && (slide.image || '/photos/1b326e82-8c46-43fb-979c-dd9554887dcb.jpg') && (
        <div 
          className="absolute left-0 w-full h-[384px] overflow-hidden pointer-events-none"
          style={{ top: '812px' }}
        >
          <img 
            src={slide.image || '/photos/1b326e82-8c46-43fb-979c-dd9554887dcb.jpg'} 
            alt="Endüstriyel Sahne Alt Bant" 
            className="w-full h-full object-cover" 
            style={{ 
              objectPosition: `${slide.focusX ?? 50}% ${slide.focusY ?? 82}%`,
              transform: `scale(${slide.imageZoom ?? 1.0})`
            }}
          />
        </div>
      )}

      {/* 1. TOP HEADER SECTION */}
      <div 
        className="relative z-10 w-full"
        style={{ marginTop: isF3Cover ? '500px' : '0px' }}
      >
        <div 
          className="flex items-center justify-between pb-[32px]" 
          style={{ borderBottom: `1.5px solid ${currentTheme.divider}` }}
        >
          <div className="flex items-center gap-3">
            {/* Orange Square Mark */}
            <div 
              className="w-4 h-4 rounded-[2px] shadow-sm flex-shrink-0" 
              style={{ backgroundColor: accentLineColor }} 
            />
            <span 
              className="font-bold uppercase"
              style={{ 
                color: currentTheme.headerText,
                fontSize: `${headerBadgeSize}px`,
                letterSpacing: `${headerBadgeTracking}em`,
                fontFamily: `'${subtitleFont}', sans-serif`
              }}
            >
              {slide.category || 'SİGORTA REHBERİ'}
            </span>
          </div>

          {showSlideNumber && totalSlides > 1 && (
            <div 
              className="px-3.5 py-1 rounded-full"
              style={{ 
                color: currentTheme.headerText, 
                backgroundColor: currentTheme.divider,
                fontFamily: `'${subtitleFont}', sans-serif`,
                fontSize: '29px',
                fontWeight: 700
              }}
            >
              {currentSlideIndex + 1} / {totalSlides}
            </div>
          )}
        </div>
      </div>

      {/* 2. SABİT ÇAPA İÇERİK BÖLÜMÜ (Sabit y=430 başlangıç) */}
      <div 
        className="relative z-10 flex flex-col justify-start flex-1 pr-4"
        style={{
          marginTop: isF3Cover ? '30px' : (isPortrait ? '135px' : '70px'),
          maxHeight: isF2Closing ? '540px' : 'none'
        }}
      >
        {/* Preheading (Örn: GENİŞLETİLMİŞ KASKO, SIRADAKİ ADIM, COĞRAFİ SINIR) */}
        {slide.preheading && (
          <div 
            className="font-bold uppercase tracking-[0.1em] mb-4"
            style={{ 
              color: currentTheme.preheading,
              fontSize: '29px',
              fontFamily: `'${subtitleFont}', sans-serif`
            }}
          >
            {slide.preheading}
          </div>
        )}

        {/* Main Title - Zodiak Serif font */}
        <h1 
          className="whitespace-pre-line"
          style={{ 
            color: currentTheme.title,
            fontFamily: `'${titleFont}', Georgia, serif`,
            fontSize: `${effectiveTitleSize}px`,
            lineHeight: titleLineHeight,
            fontWeight: titleWeight,
            letterSpacing: '-0.01em',
            textWrap: 'balance'
          }}
        >
          {slide.title || 'Başlık Metni'}
        </h1>

        {/* Accent Underline — 145px genişlik, 6px kalınlık, 37px başlık altı */}
        <div 
          className="rounded-full mt-[37px] mb-[45px]" 
          style={{ 
            backgroundColor: accentLineColor,
            width: `${accentLineWidth}px`,
            height: `${accentLineHeight}px`
          }}
        />

        {/* LAYOUT: LIST */}
        {slide.layoutType === 'list' ? (
          <div className="flex flex-col space-y-4 max-w-[912px]">
            {(listItems.length > 0 ? listItems : ['Madde 1', 'Madde 2', 'Madde 3']).map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-6 pb-4"
                style={{ borderBottom: `1.5px solid ${currentTheme.listDivider}` }}
              >
                <span 
                  className="w-8 flex-shrink-0"
                  style={{ 
                    color: currentTheme.preheading,
                    fontFamily: `'${subtitleFont}', sans-serif`,
                    fontWeight: 700,
                    fontSize: '34px'
                  }}
                >
                  {idx + 1}
                </span>
                <span 
                  className="leading-snug"
                  style={{ 
                    color: currentTheme.listItemText,
                    fontFamily: `'${subtitleFont}', sans-serif`,
                    fontSize: '34px',
                    fontWeight: 500
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        ) : slide.layoutType === 'metrics' ? (
          /* METRICS LAYOUT: İki Sütunlu Vurgu Bloğu */
          <div className="space-y-8 max-w-[912px]">
            <p 
              style={{ 
                color: currentTheme.subtitle,
                fontFamily: `'${subtitleFont}', sans-serif`,
                fontSize: `${Math.max(subtitleFontSize, 32)}px`,
                lineHeight: subtitleLineHeight,
                fontWeight: subtitleWeight
              }}
            >
              {renderSubtitle() || 'Açıklama metnini sol panelden girebilirsiniz.'}
            </p>

            <div className="flex items-stretch gap-10 pt-4">
              <div className="flex-1 flex flex-col justify-start">
                <div 
                  className="font-black text-[120px] leading-[0.90] mb-3"
                  style={{ 
                    color: currentTheme.statNumber,
                    fontFamily: `'${subtitleFont}', sans-serif`
                  }}
                >
                  {slide.stat1Number || '%100'}
                </div>
                <div 
                  className="leading-[1.38]"
                  style={{ 
                    color: currentTheme.statDesc,
                    fontFamily: `'${subtitleFont}', sans-serif`,
                    fontSize: '32px',
                    fontWeight: 400
                  }}
                >
                  {slide.stat1Text || 'Tam kapsamlı teminat ve onarım güvencesi'}
                </div>
              </div>

              <div 
                className="w-[2px] self-stretch flex-shrink-0"
                style={{ backgroundColor: accentLineColor }}
              />

              <div className="flex-1 flex flex-col justify-start">
                <div 
                  className="font-black text-[120px] leading-[0.90] mb-3"
                  style={{ 
                    color: currentTheme.statNumber,
                    fontFamily: `'${subtitleFont}', sans-serif`
                  }}
                >
                  {slide.stat2Number || '7/24'}
                </div>
                <div 
                  className="leading-[1.38]"
                  style={{ 
                    color: currentTheme.statDesc,
                    fontFamily: `'${subtitleFont}', sans-serif`,
                    fontSize: '32px',
                    fontWeight: 400
                  }}
                >
                  {slide.stat2Text || 'Kesintisiz yol yardım ve asistans desteği'}
                </div>
              </div>
            </div>
          </div>
        ) : slide.layoutType === 'comparison' ? (
          /* 1. İKİ SÜTUN KARŞILAŞTIRMA */
          <div className="flex items-stretch gap-8 max-w-[912px]">
            <div className="flex-1 flex flex-col">
              <div 
                className="font-bold text-[29px] mb-3"
                style={{ 
                  color: currentTheme.preheading,
                  fontFamily: `'${subtitleFont}', sans-serif` 
                }}
              >
                {slide.col1Title || 'STANDART TEMİNAT'}
              </div>
              <p 
                className="text-[32px] leading-relaxed"
                style={{ 
                  color: currentTheme.subtitle,
                  fontFamily: `'${subtitleFont}', sans-serif` 
                }}
              >
                {slide.col1Body || 'Temel yasal limitler kapsamında sınırlı koruma sağlar.'}
              </p>
            </div>
            <div 
              className="w-[2px] self-stretch flex-shrink-0"
              style={{ backgroundColor: accentLineColor }}
            />
            <div className="flex-1 flex flex-col">
              <div 
                className="font-bold text-[29px] mb-3"
                style={{ 
                  color: currentTheme.preheading,
                  fontFamily: `'${subtitleFont}', sans-serif` 
                }}
              >
                {slide.col2Title || 'GENİŞLETİLMİŞ TEMİNAT'}
              </div>
              <p 
                className="text-[32px] leading-relaxed"
                style={{ 
                  color: currentTheme.subtitle,
                  fontFamily: `'${subtitleFont}', sans-serif` 
                }}
              >
                {slide.col2Body || 'Limitsiz İMM ve orijinal parça garantisiyle tam koruma sunar.'}
              </p>
            </div>
          </div>
        ) : slide.layoutType === 'qa_takeaway' ? (
          /* 2. SORU-CEVAP KAPANISI */
          <div className="space-y-8 max-w-[912px]">
            <div 
              className="pl-6"
              style={{ borderLeft: `6px solid ${accentLineColor}` }}
            >
              <p 
                className="font-medium text-[36px] leading-snug"
                style={{ 
                  color: currentTheme.headerText,
                  fontFamily: `'${subtitleFont}', sans-serif`
                }}
              >
                {slide.subtitle || 'Kasko bir masraf değil, kriz anında nakit akışınızı ve operasyonunuzu koruyan stratejik bir kalkandır.'}
              </p>
            </div>
          </div>
        ) : slide.layoutType === 'single_stat' ? (
          /* 3. TEK KAHRAMAN RAKAM */
          <div className="space-y-6 max-w-[912px]">
            <div 
              className="font-black text-[140px] leading-[0.90]"
              style={{ 
                color: currentTheme.statNumber,
                fontFamily: `'${subtitleFont}', sans-serif`
              }}
            >
              {slide.stat1Number || '48 SAAT'}
            </div>
            <p 
              className="text-[32px] leading-relaxed"
              style={{ 
                color: currentTheme.subtitle,
                fontFamily: `'${subtitleFont}', sans-serif`
              }}
            >
              {slide.subtitle || 'Hasar anından itibaren ikame araç ve ekspersiz onay süreci.'}
            </p>
          </div>
        ) : slide.layoutType === 'quote' ? (
          /* 4. ALINTI KARTI */
          <div className="space-y-6 max-w-[912px]">
            <div 
              className="pl-6"
              style={{ borderLeft: `6px solid ${accentLineColor}` }}
            >
              <p 
                className="italic text-[60px] leading-[1.22]"
                style={{ 
                  color: currentTheme.title,
                  fontFamily: `'${titleFont}', Georgia, serif`
                }}
              >
                "{slide.subtitle || 'Doğru risk analizi yapılmamış bir poliçe, sadece kâğıt üzerinde var olan bir güvencedir.'}"
              </p>
            </div>
            {slide.quoteAuthor && (
              <div 
                className="font-medium text-[32px]"
                style={{ 
                  color: currentTheme.preheading,
                  fontFamily: `'${subtitleFont}', sans-serif`
                }}
              >
                — {slide.quoteAuthor}
              </div>
            )}
          </div>
        ) : slide.layoutType === 'steps' ? (
          /* 5. ADIM LİSTESİ */
          <div className="flex flex-col space-y-6 max-w-[912px]">
            {(slide.steps || [
              { title: 'Risk Tespiti', desc: 'İşletmenizin ve araç filonuzun operasyonel risk haritası çıkarılır.' },
              { title: 'Poliçe Karşılaştırma', desc: 'En az 15 farklı sigorta şirketinden özel teminatlı teklifler toplanır.' },
              { title: '7/24 Kesintisiz Takip', desc: 'Hasar anında dosya ve ikame araç süreçleri brokerinizce yönetilir.' }
            ]).map((st, sidx) => (
              <div 
                key={sidx}
                className="flex items-start gap-5 pb-4"
                style={{ borderBottom: `1.5px solid ${currentTheme.listDivider}` }}
              >
                <span 
                  className="font-black text-[56px] leading-none flex-shrink-0"
                  style={{ 
                    color: currentTheme.preheading,
                    fontFamily: `'${subtitleFont}', sans-serif`
                  }}
                >
                  {sidx + 1}
                </span>
                <div>
                  <h4 
                    className="font-bold text-[34px] leading-tight mb-1"
                    style={{ 
                      color: currentTheme.headerText,
                      fontFamily: `'${subtitleFont}', sans-serif`
                    }}
                  >
                    {st.title}
                  </h4>
                  <p 
                    className="text-[32px] leading-relaxed"
                    style={{ 
                      color: currentTheme.subtitle,
                      fontFamily: `'${subtitleFont}', sans-serif`
                    }}
                  >
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* STANDARD / CTA / F2 LAYOUT */
          <div className="space-y-7 max-w-[912px]">
            <p 
              style={{ 
                color: currentTheme.subtitle,
                fontFamily: `'${subtitleFont}', sans-serif`,
                fontSize: `${Math.max(subtitleFontSize, 32)}px`,
                lineHeight: subtitleLineHeight,
                fontWeight: subtitleWeight
              }}
            >
              {renderSubtitle() || 'Açıklama metnini sol panelden girebilirsiniz.'}
            </p>

            {slide.layoutType === 'cta' && (
              <div className="pt-3">
                <div 
                  className="inline-block px-10 py-5 rounded-[4px] font-bold text-[32px] tracking-wide"
                  style={{ 
                    backgroundColor: currentTheme.ctaBg,
                    color: currentTheme.ctaText,
                    fontFamily: `'${subtitleFont}', sans-serif`
                  }}
                >
                  {slide.ctaText || 'Teklif için bize ulaşın'}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. EXACT FOOTER SECTION (165px strip — pixel measured from reference: divider at y=1185/1350) */}
      <div 
        className="relative z-10 w-full h-[165px] flex items-center justify-between"
        style={{ borderTop: `1.5px solid ${currentTheme.divider}` }}
      >
        {/* Left: HD Vector Brand Logo with readable subtitle */}
        <div className="flex items-center">
          <ArtseLogo 
            variant={currentTheme.logoVariant} 
            customLogoUrl={customLogoUrl}
            logoScale={Math.max(0.7, Math.min(1.4, logoScale))}
          />
        </div>

        {/* Right: ARTSEBROKER.COM.TR in exact brand color and typography */}
        <div className="flex items-center">
          <span 
            className="font-bold tracking-[0.18em] uppercase select-text"
            style={{ 
              color: currentTheme.footerWeb,
              fontSize: `${websiteFontSize}px`,
              fontFamily: `'${subtitleFont}', sans-serif`
            }}
          >
            {websiteText}
          </span>
        </div>
      </div>
    </div>
  );
});

CanvasPreview.displayName = 'CanvasPreview';

export default CanvasPreview;
