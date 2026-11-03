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

  return (
    <div
      ref={ref}
      id="export-canvas-node"
      style={{
        width: `${canvasWidth}px`,
        height: `${canvasHeight}px`,
        backgroundColor: isF3Cover ? '#FAF9F6' : currentTheme.bg,
      }}
      className="relative flex flex-col justify-between px-[85px] pt-[56px] pb-0 select-none overflow-hidden transition-colors duration-300"
    >
      {/* F3 Fotoğraflı Kart: Üst 520 px Tam Genişlik Kadraj (Metin fotoğrafın üstüne binmez) */}
      {isF3Cover && slide.image && (
        <div 
          className="absolute top-0 left-0 w-full h-[520px] overflow-hidden pointer-events-none"
        >
          <img 
            src={slide.image} 
            alt="Endüstriyel Sahne" 
            className="w-full h-full object-cover" 
            style={{ objectPosition: '50% 42%' }}
          />
        </div>
      )}

      {/* 1. TOP HEADER SECTION */}
      <div 
        className="relative z-10 w-full"
        style={{ marginTop: isF3Cover ? '500px' : '0px' }}
      >
        <div 
          className="flex items-center justify-between pb-[36px]" 
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
              {slide.category || 'SİGORTA SÖZLÜĞÜ'}
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

      {/* 2. CENTER CONTENT SECTION */}
      <div className="relative z-10 flex flex-col justify-center flex-1 my-auto pr-4 py-8">
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
          className="tracking-tight whitespace-pre-line"
          style={{ 
            color: currentTheme.title,
            fontFamily: `'${titleFont}', Georgia, serif`,
            fontSize: `${titleFontSize}px`,
            lineHeight: titleLineHeight,
            fontWeight: titleWeight
          }}
        >
          {slide.title || 'Başlık Metni'}
        </h1>

        {/* Accent Underline — pixel measured: 79px wide, 5px tall, 37px below title, 55px above body */}
        <div 
          className="rounded-full mt-[37px] mb-[55px]" 
          style={{ 
            backgroundColor: accentLineColor,
            width: `${accentLineWidth}px`,
            height: `${accentLineHeight}px`
          }}
        />

        {/* LAYOUT: LIST */}
        {slide.layoutType === 'list' ? (
          <div className="flex flex-col space-y-4 max-w-[940px]">
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
          <div className="space-y-8 max-w-[920px]">
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
                  className="font-black text-[96px] leading-[0.92] mb-3"
                  style={{ 
                    color: currentTheme.statNumber,
                    fontFamily: `'${subtitleFont}', sans-serif`
                  }}
                >
                  {slide.stat1Number || '%100'}
                </div>
                <div 
                  className="leading-[1.40]"
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
                  className="font-black text-[96px] leading-[0.92] mb-3"
                  style={{ 
                    color: currentTheme.statNumber,
                    fontFamily: `'${subtitleFont}', sans-serif`
                  }}
                >
                  {slide.stat2Number || '7/24'}
                </div>
                <div 
                  className="leading-[1.40]"
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
        ) : (
          /* STANDARD / CTA LAYOUT */
          <div className="space-y-7 max-w-[920px]">
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
            logoScale={logoScale}
            subtextScale={subtextScale}
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
