"use client";

import React, { useState } from 'react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Trash2, Plus, Users } from 'lucide-react';
import Image from 'next/image';
import type { TeamMember } from '@/types';
import TeamMemberForm from './team-member-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function TeamManager() {
  const { toast } = useToast();
  const firestore = useFirestore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  const teamQuery = useMemoFirebase(() => 
    firestore ? query(collection(firestore, 'pkcreative_teamMembers'), orderBy('order', 'asc')) : null
  , [firestore]);

  const { data: members, isLoading } = useCollection<TeamMember>(teamQuery);

  const handleDelete = async (id: string) => {
    if (!firestore || !window.confirm("Are you sure you want to remove this team member?")) return;
    try {
      await deleteDoc(doc(firestore, 'pkcreative_teamMembers', id));
      toast({ title: "Team member removed" });
    } catch (error) {
      toast({ variant: "destructive", title: "Error deleting team member" });
    }
  };

  if (isLoading) {
    return <div className="space-y-4"><Skeleton className="h-20 w-full" /><Skeleton className="h-64 w-full" /></div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
                <Users className="h-8 w-8 text-primary" />
                Team Management
            </h1>
            <p className="text-muted-foreground">Add and manage the amazing people behind your agency.</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if(!open) setEditingMember(null); }}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Add Member</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingMember ? 'Edit Team Member' : 'Add Team Member'}</DialogTitle>
            </DialogHeader>
            <TeamMemberForm 
                member={editingMember} 
                onSuccess={() => setIsDialogOpen(false)} 
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {members?.map((member) => (
          <Card key={member.id} className="overflow-hidden flex flex-col group relative">
            <CardContent className="p-0 relative aspect-[3/4] bg-muted">
              {member.photoUrl ? (
                <Image src={member.photoUrl} alt={member.name} fill className="object-cover transition-transform group-hover:scale-105" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-muted-foreground">No Photo</div>
              )}
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 right-4 flex gap-2">
                         <Button variant="secondary" size="sm" onClick={() => { setEditingMember(member); setIsDialogOpen(true); }}>Edit</Button>
                         <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => handleDelete(member.id)}>
                            <Trash2 className="h-4 w-4" />
                         </Button>
                    </div>
               </div>
            </CardContent>
            <div className="p-4 border-t text-center">
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-sm text-primary font-medium">{member.designation}</p>
            </div>
          </Card>
        ))}
        {members?.length === 0 && (
          <div className="col-span-full py-24 text-center border border-dashed rounded-xl text-muted-foreground">
            No team members added yet. Click "Add Member" to introduce your team.
          </div>
        )}
      </div>
    </div>
  );
}
