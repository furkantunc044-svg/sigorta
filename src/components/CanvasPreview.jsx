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
      bg: '#FAF9F5', // Sampled RGB(250, 249, 245)
      headerText: '#08132F',
      divider: '#E5E1D8', // Sampled divider line RGB(236, 232, 223)
      preheading: '#F05A28', // Orange #F05A28 = RGB(240, 90, 40)
      title: '#08132F', // Sampled title color RGB(8, 19, 47)
      subtitle: '#445569', // Sampled body text RGB(68, 85, 105)
      listItemText: '#08132F',
      listDivider: '#E4DFD3',
      footerWeb: '#08132F', // Sampled website text on cream = dark navy #08132F
      logoVariant: 'dark',
      badgeColor: '#08132F',
      ctaBg: '#F05A28',
      ctaText: '#FFFFFF'
    },
    navy: {
      bg: navyBgColor, // Sampled exact RGB(0, 25, 76)
      headerText: '#E6EDF5',
      divider: 'rgba(255, 255, 255, 0.16)', // Sampled divider RGB(41, 68, 115)
      preheading: '#FF7A29',
      title: '#FFFFFF',
      subtitle: '#CAD5E2',
      listItemText: '#FFFFFF',
      listDivider: 'rgba(255, 255, 255, 0.14)',
      footerWeb: '#8CA3C7', // Sampled exact ice-slate blue RGB(140, 163, 199)
      logoVariant: 'light',
      badgeColor: '#E6EDF5',
      ctaBg: '#E67330',
      ctaText: '#FFFFFF'
    },
    anthracite: {
      bg: '#0D1117',
      headerText: '#E2E8F0',
      divider: 'rgba(255, 255, 255, 0.12)',
      preheading: '#FF7A29',
      title: '#F8FAFC',
      subtitle: '#94A3B8',
      listItemText: '#F8FAFC',
      listDivider: 'rgba(255, 255, 255, 0.12)',
      footerWeb: '#8CA3C7',
      logoVariant: 'light',
      badgeColor: '#CBD5E1',
      ctaBg: '#E67330',
      ctaText: '#FFFFFF'
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
        <span key={i} className="font-semibold" style={{ color: accentLineColor }}>
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

  return (
    <div
      ref={ref}
      id="export-canvas-node"
      style={{
        width: `${canvasWidth}px`,
        height: `${canvasHeight}px`,
        backgroundColor: currentTheme.bg,
      }}
      className="relative flex flex-col justify-between px-[85px] pt-[56px] pb-0 select-none overflow-hidden transition-colors duration-300"
    >
      {/* Background Graphic Overlay if image specified */}
      {slide.image && (
        <div 
          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-20 mix-blend-luminosity"
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      )}

      {/* 1. TOP HEADER SECTION */}
      <div className="relative z-10 w-full">
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
              className="text-[20px] font-semibold tracking-wider px-3.5 py-1 rounded-full font-mono"
              style={{ 
                color: currentTheme.headerText, 
                backgroundColor: currentTheme.divider 
              }}
            >
              {String(currentSlideIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
            </div>
          )}
        </div>
      </div>

      {/* 2. CENTER CONTENT SECTION */}
      <div className="relative z-10 flex flex-col justify-center flex-1 my-auto pr-4 py-8">
        {/* Preheading (Örn: GENİŞLETİLMİŞ KASKO, SIRADAKİ ADIM, COĞRAFİ SINIR) */}
        {slide.preheading && (
          <div 
            className="font-bold uppercase tracking-[0.16em] mb-4"
            style={{ 
              color: currentTheme.preheading,
              fontSize: '25px',
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
                style={{ borderBottom: `1px solid ${currentTheme.listDivider}` }}
              >
                <span 
                  className="font-bold text-[30px] font-sans w-8 flex-shrink-0"
                  style={{ color: currentTheme.preheading }}
                >
                  {idx + 1}
                </span>
                <span 
                  className="text-[27px] font-medium leading-snug"
                  style={{ 
                    color: currentTheme.listItemText,
                    fontFamily: `'${subtitleFont}', sans-serif`
                  }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        ) : (
          /* STANDARD / CTA LAYOUT */
          <div className="space-y-7 max-w-[920px]">
            <p 
              style={{ 
                color: currentTheme.subtitle,
                fontFamily: `'${subtitleFont}', sans-serif`,
                fontSize: `${subtitleFontSize}px`,
                lineHeight: subtitleLineHeight,
                fontWeight: subtitleWeight
              }}
            >
              {renderSubtitle() || 'Açıklama metnini sol panelden girebilirsiniz.'}
            </p>

            {slide.layoutType === 'cta' && (
              <div className="pt-3">
                <div 
                  className="inline-block px-10 py-5 rounded-lg font-bold text-[27px] tracking-wide shadow-md"
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
