"use client";

import React from 'react';
import type { SiteContent } from '@/types';
import SectionHeader from './section-header';
import { Badge } from '../ui/badge';

interface SkillsSectionProps {
    content?: SiteContent | null;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({ content }) => {
    if (!content?.skills || content.skills.length === 0) {
        return null;
    }

    return (
        <section id="skills" className="py-20 lg:py-32">
            <div className="container mx-auto px-4">
                <SectionHeader 
                    title={content.skillsSectionTitle}
                    description={content.skillsSectionDescription}
                />
                 <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up animation-delay-300">
                    {content.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-lg px-6 py-2 rounded-full">
                           {skill}
                        </Badge>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default SkillsSection;

    