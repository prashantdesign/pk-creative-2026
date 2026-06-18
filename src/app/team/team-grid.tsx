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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {members?.map((member) => (
        <Card key={member.id} className="overflow-hidden border-none shadow-none group">
          <CardContent className="p-0">
             <div className="relative aspect-[3/4] rounded-xl overflow-hidden mb-4 bg-muted">
                {member.photoUrl ? (
                    <Image 
                        src={member.photoUrl} 
                        alt={member.name} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-105" 
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-secondary">
                        No Photo
                    </div>
                )}
             </div>
             <div className="text-center">
                 <h3 className="text-xl font-bold tracking-tight">{member.name}</h3>
                 <p className="text-primary font-medium">{member.designation}</p>
             </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
