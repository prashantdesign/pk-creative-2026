"use client";

import React from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import type { TeamMember } from '@/types';

export default function TeamGrid() {
  const firestore = useFirestore();

  const teamQuery = useMemoFirebase(() => 
    firestore ? query(collection(firestore, 'pkcreative_teamMembers'), orderBy('order', 'asc')) : null
  , [firestore]);

  const { data: members, isLoading } = useCollection<TeamMember>(teamQuery);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="aspect-[3/4] w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (members?.length === 0) {
    return (
        <div className="text-center py-24 text-muted-foreground">
            We are currently updating our team directory. Check back soon!
        </div>
    );
  }

  const leadMember = members ? members[0] : null;
  const otherMembers = members ? members.slice(1) : [];

  return (
    <div className="space-y-16">
      {/* Lead Member (Owner / CEO / Founder) */}
      {leadMember && (
        <div className="flex flex-col items-center text-center">
          <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-full overflow-hidden mb-6 bg-muted border-4 border-primary/30 shadow-xl transition-transform duration-500 hover:scale-105">
            {leadMember.photoUrl ? (
              <Image 
                src={leadMember.photoUrl} 
                alt={leadMember.name} 
                fill 
                className="object-cover" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-secondary">
                No Photo
              </div>
            )}
          </div>
          <div className="space-y-3">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{leadMember.name}</h3>
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs sm:text-sm font-semibold tracking-wide">
                <span className="text-amber-500">★</span>
                <span>{leadMember.designation}</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Other Team Members Grid */}
      {otherMembers.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pt-12 border-t border-border/40">
          {otherMembers.map((member) => (
            <div key={member.id} className="flex flex-col items-center text-center group">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full overflow-hidden mb-4 bg-muted border-2 border-border/60 shadow-md transition-transform duration-500 group-hover:scale-105">
                {member.photoUrl ? (
                  <Image 
                    src={member.photoUrl} 
                    alt={member.name} 
                    fill 
                    className="object-cover" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-secondary">
                    No Photo
                  </div>
                )}
              </div>
              <div className="space-y-1">
                <h4 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">{member.name}</h4>
                <p className="text-primary font-medium text-xs sm:text-sm">{member.designation}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
