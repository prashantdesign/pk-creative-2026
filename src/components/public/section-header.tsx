import React from 'react';

interface SectionHeaderProps {
  title?: string;
  description?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, description }) => {
  if (!title && !description) {
    return null;
  }

  return (
    <div className="text-center mb-12 animate-fade-in-up">
      {title && <h2 className="text-4xl font-bold tracking-tight">{title}</h2>}
      {description && <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">{description}</p>}
    </div>
  );
};

export default SectionHeader;

    