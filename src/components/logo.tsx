import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  logoUrl?: string;
  siteName?: string;
}

const Logo = ({ className, logoUrl, siteName }: LogoProps) => {
  if (logoUrl) {
    return (
      <div className={`relative h-10 w-32 ${className || ''}`}>
        <Image 
          src={logoUrl} 
          alt={siteName || "Agency Logo"} 
          fill 
          className="object-contain object-left" 
        />
      </div>
    );
  }

  // Fallback to text logo
  const defaultText = siteName || "PK.Creative";
  
  // If the user hasn't set a custom site name, we can do the stylized PK.Creative
  if (!siteName || siteName === "PK.Creative") {
    return (
      <div className={`text-2xl font-headline font-bold tracking-tighter ${className || ''}`}>
        <span className="text-foreground">PK</span>
        <span className="text-primary">.</span>
        <span className="text-foreground">Creative</span>
      </div>
    );
  }

  // Otherwise, just render their custom site name text
  return (
    <div className={`text-2xl font-headline font-bold tracking-tighter ${className || ''}`}>
      <span className="text-foreground">{siteName}</span>
    </div>
  );
};

export default Logo;
