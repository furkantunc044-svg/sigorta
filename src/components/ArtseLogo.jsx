import React from 'react';

/**
 * ARTSE Sigorta Brokerliği A.Ş. Official Brand Logo
 * Uses the authentic official 1500px high-resolution logo assets provided:
 * - /logos/artse-official-light.png (for Cream / Light backgrounds)
 * - /logos/artse-official-dark.png  (for Navy / Dark backgrounds)
 */
export default function ArtseLogo({ 
  variant = 'dark', // 'dark' = on cream bg, 'light' = on navy bg
  customLogoUrl = null, 
  logoScale = 1.0,
  className = '' 
}) {
  const isDarkBg = variant === 'light';

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

  // Authentic 1500px official transparent brand logo
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
