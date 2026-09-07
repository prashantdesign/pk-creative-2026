"use client";

import React from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';
import type { TeamMember } from '@/types';
import { motion } from 'framer-motion';
import TiltCard from '@/components/motion/tilt-card';
import { staggerContainer, staggerItem } from '@/components/motion/reveal';

export default function TeamGrid() {
  const firestore = useFirestore();

  const teamQuery = useMemoFirebase(
    () =>
      firestore
        ? query(collection(firestore, 'pkcreative_teamMembers'), orderBy('order', 'asc'))
        : null,
    [firestore]
  );

  const { data: members, isLoading } = useCollection<TeamMember>(teamQuery);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="aspect-[3/4] w-full rounded-3xl" />
        ))}
      </div>
    );
  }

  if (members?.length === 0) {
    return (
      <div className="py-24 text-center text-muted-foreground">
        We are currently updating our team directory. Check back soon!
      </div>
    );
  }

  const leadMember = members ? members[0] : null;
  const otherMembers = members ? members.slice(1) : [];

  return (
    <div className="space-y-14">
      {leadMember && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center"
        >
          <TiltCard
            max={7}
            className="group w-full max-w-sm overflow-hidden rounded-3xl border-2 border-primary/20 bg-background p-6 text-center shadow-lg"
          >
            <div className="mb-6 flex w-full items-center justify-center overflow-hidden rounded-2xl border border-border/10 bg-muted/20">
              {leadMember.photoUrl ? (
                <img
                  src={leadMember.photoUrl}
                  alt={leadMember.name}
                  className="h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                />
              ) : (
                <div className="flex aspect-square w-full items-center justify-center bg-secondary text-muted-foreground">
                  No Photo
                </div>
              )}
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-foreground">{leadMember.name}</h3>
            <div className="mt-3 flex justify-center">
              <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary sm:text-sm">
                {leadMember.designation}
              </span>
            </div>
          </TiltCard>
        </motion.div>
      )}

      {otherMembers.length > 0 && (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-6 border-t border-border/40 pt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {otherMembers.map((member) => (
            <motion.div key={member.id} variants={staggerItem}>
              <TiltCard
                max={6}
                className="group h-full overflow-hidden rounded-3xl border border-border/40 bg-background p-5 text-center"
              >
                <div className="mb-4 flex w-full items-center justify-center overflow-hidden rounded-2xl border border-border/10 bg-muted/20">
                  {member.photoUrl ? (
                    <img
                      src={member.photoUrl}
                      alt={member.name}
                      loading="lazy"
                      className="h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex aspect-square w-full items-center justify-center bg-secondary text-muted-foreground">
                      No Photo
                    </div>
                  )}
                </div>
                <h4 className="truncate text-lg font-bold tracking-tight text-foreground sm:text-xl">
                  {member.name}
                </h4>
                <p className="truncate text-xs font-medium text-primary sm:text-sm">
                  {member.designation}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
