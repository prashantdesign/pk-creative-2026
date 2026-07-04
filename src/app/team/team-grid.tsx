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
        <div className="flex justify-center animate-fade-in-up">
          <Card className="overflow-hidden border-2 border-primary/20 bg-white dark:bg-card/50 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 max-w-sm w-full p-6 flex flex-col items-center text-center group">
            <CardContent className="p-0 w-full flex flex-col items-center">
              <div className="w-full rounded-xl overflow-hidden mb-6 bg-muted/20 border border-border/10 shadow-inner flex items-center justify-center">
                {leadMember.photoUrl ? (
                  <img 
                    src={leadMember.photoUrl} 
                    alt={leadMember.name} 
                    className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]" 
                  />
                ) : (
                  <div className="w-full aspect-square flex items-center justify-center text-muted-foreground bg-secondary">
                    No Photo
                  </div>
                )}
              </div>
              <div className="space-y-3 w-full">
                <h3 className="text-2xl font-bold tracking-tight text-foreground">{leadMember.name}</h3>
                <div className="flex justify-center">
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs sm:text-sm font-semibold tracking-wide">
                    {leadMember.designation}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Other Team Members Grid */}
      {otherMembers.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pt-12 border-t border-border/40">
          {otherMembers.map((member, index) => (
            <Card 
              key={member.id} 
              className="overflow-hidden border border-border/40 bg-white dark:bg-card/50 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-5 flex flex-col items-center text-center group animate-fade-in-up"
              style={{ animationDelay: `${150 + index * 50}ms` }}
            >
              <CardContent className="p-0 w-full flex flex-col items-center">
                <div className="w-full rounded-xl overflow-hidden mb-4 bg-muted/20 border border-border/10 shadow-inner flex items-center justify-center">
                  {member.photoUrl ? (
                    <img 
                      src={member.photoUrl} 
                      alt={member.name} 
                      className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]" 
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full aspect-square flex items-center justify-center text-muted-foreground bg-secondary">
                      No Photo
                    </div>
                  )}
                </div>
                <div className="space-y-1 w-full">
                  <h4 className="text-lg sm:text-xl font-bold tracking-tight text-foreground truncate">{member.name}</h4>
                  <p className="text-primary font-medium text-xs sm:text-sm truncate">{member.designation}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
