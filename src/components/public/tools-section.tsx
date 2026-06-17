import React from 'react';
import type { SiteContent } from '@/types';
import Image from 'next/image';

export default function ToolsSection({ content }: { content: SiteContent | null }) {
  if (!content?.tools || content.tools.length === 0) {
    return null;
  }

  return (
    <section id="tools" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
            {content.toolsSectionTitle && (
                <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in-up">
                    {content.toolsSectionTitle}
                </h2>
            )}
            {content.toolsSectionDescription && (
                <p className="text-lg text-muted-foreground mb-12 animate-fade-in-up animation-delay-300">
                    {content.toolsSectionDescription}
                </p>
            )}
        </div>
        <div className="text-center animate-fade-in-up animation-delay-600">
          <div className="inline-grid grid-cols-3 md:grid-cols-6 gap-x-8 gap-y-12">
            {content.tools.map((tool, index) => (
              <div key={index} className="text-center w-24 flex flex-col items-center">
                  <div className="h-20 w-20 rounded-lg bg-white p-3 flex items-center justify-center mb-2 shadow-md hover:shadow-xl transition-shadow">
                      <Image src={tool.iconUrl} alt={tool.name} width={56} height={56} className="object-contain" />
                  </div>
                  <p className="text-sm font-medium">{tool.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
