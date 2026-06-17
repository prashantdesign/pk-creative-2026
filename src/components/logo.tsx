import React from 'react';

const Logo = ({ className }: { className?: string }) => {
  return (
    <div className={`text-2xl font-headline font-bold tracking-tighter ${className}`}>
      <span className="text-foreground">PK</span>
      <span className="text-primary">.</span>
      <span className="text-foreground">Creative</span>
    </div>
  );
};

export default Logo;
