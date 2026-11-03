import React from 'react';

/**
 * ARTSE Sigorta Brokerliği A.Ş. Official Brand Logo
 * Uses the authentic official 1500px high-resolution logo assets provided:
 * - /logos/artse-official-light.png (for Cream / Light backgrounds)
 * - /logos/artse-official-dark.png  (for Navy / Dark backgrounds)
 */
export default function ArtseLogo({ 
  variant = 'dark', // 'dark' = on navy/dark bg, 'light' = on cream/white bg
  customLogoUrl = null, 
  logoScale = 1.0,
  className = '' 
}) {
  const isDarkBg = variant === 'dark';

  if (customLogoUrl) {
    return (
      <div 
        className={`flex items-center ${className}`}
        style={{ transform: `scale(${logoScale})`, transformOrigin: 'left center' }}
      >
        <img 
          src={customLogoUrl} 
          alt="Artse Sigorta" 
          className="h-10 w-auto object-contain max-w-[280px]" 
        />
      </div>
    );
  }

  // Official transparent brand logo:
  // artse-official-dark.png has white text (for dark navy bg)
  // artse-official-light.png has navy text (for light cream/white bg)
  const logoSrc = isDarkBg 
    ? '/logos/artse-official-dark.png' 
    : '/logos/artse-official-light.png';

  return (
    <div 
      className={`flex items-center select-none ${className}`}
      style={{ transform: `scale(${logoScale})`, transformOrigin: 'left center' }}
    >
      <img
        src={logoSrc}
        alt="ARTSE Sigorta Brokerliği A.Ş."
        className="h-[52px] w-auto max-w-[320px] object-contain pointer-events-none"
      />
    </div>
  );
}
