"use client";

import React, { useMemo } from 'react';
import { collection, query, orderBy, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useFirestore, useCollection } from '@/firebase';
import type { ContactMessage } from '@/types';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Trash2, Mail, MailOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export default function MessagesClient() {
  const firestore = useFirestore();
  const { toast } = useToast();

  const messagesQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'contactMessages'), orderBy('timestamp', 'desc'));
  }, [firestore]);

  const { data: messages, isLoading: loading } = useCollection<ContactMessage>(messagesQuery);
  
  const toggleReadStatus = (id: string, currentStatus: boolean) => {
    if (!firestore) return;
    const messageRef = doc(firestore, "contactMessages", id);
    updateDoc(messageRef, { isRead: !currentStatus })
      .then(() => {
        toast({ title: `Message marked as ${!currentStatus ? 'read' : 'unread'}.` });
      })
      .catch(async (serverError) => {
        toast({ variant: "destructive", title: "Failed to update message status." });
        const permissionError = new FirestorePermissionError({
          path: messageRef.path,
          operation: 'update',
          requestResourceData: { isRead: !currentStatus },
        });
        errorEmitter.emit('permission-error', permissionError);
      });
  }

  const handleDelete = (id: string) => {
      if (!firestore || !window.confirm("Are you sure you want to delete this message?")) return;
      const messageRef = doc(firestore, "contactMessages", id);
      deleteDoc(messageRef)
        .then(() => {
            toast({ title: "Message deleted successfully." });
        })
        .catch(async (serverError) => {
            toast({ variant: "destructive", title: "Failed to delete message." });
            const permissionError = new FirestorePermissionError({
              path: messageRef.path,
              operation: 'delete',
            });
            errorEmitter.emit('permission-error', permissionError);
        });
  }
  
  if (loading) {
    return <Skeleton className="h-64 w-full" />
  }

  return (
    <>
        {/* Mobile View */}
        <div className="grid gap-4 md:hidden">
            {messages && messages.length > 0 ? (
                messages.map((message) => (
                    <Card key={message.id} className={!message.isRead ? 'border-primary' : ''}>
                        <CardHeader>
                             <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-base">{message.name}</CardTitle>
                                    <CardDescription>{message.email}</CardDescription>
                                </div>
                                <Badge variant={message.isRead ? 'secondary' : 'default'}>{message.isRead ? 'Read' : 'Unread'}</Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                             <p className="text-sm line-clamp-3">{message.message}</p>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center">
                            <p className="text-xs text-muted-foreground">{message.timestamp ? format(message.timestamp.toDate(), 'PP pp') : 'N/A'}</p>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                <Button aria-haspopup="true" size="icon" variant="ghost">
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => toggleReadStatus(message.id, message.isRead)}>
                                    {message.isRead ? <Mail className="mr-2 h-4 w-4" /> : <MailOpen className="mr-2 h-4 w-4" />}
                                    Mark as {message.isRead ? 'Unread' : 'Read'}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-500" onClick={() => handleDelete(message.id)}>
                                    <Trash2 className="mr-2 h-4 w-4" /> Delete
                                </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardFooter>
                    </Card>
                ))
            ) : (
                <div className="text-center text-muted-foreground py-12">
                    No messages received yet.
                </div>
            )}
        </div>

        {/* Desktop View */}
        <Card className="hidden md:block">
        <CardContent className="p-0">
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Status</TableHead>
                <TableHead>From</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Received</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {messages && messages.length > 0 ? messages.map((message) => (
                <TableRow key={message.id} className={!message.isRead ? 'font-bold' : ''}>
                    <TableCell>
                        <Badge variant={message.isRead ? 'secondary' : 'default'}>{message.isRead ? 'Read' : 'Unread'}</Badge>
                    </TableCell>
                    <TableCell>
                        <div>{message.name}</div>
                        <div className="text-sm text-muted-foreground">{message.email}</div>
                    </TableCell>
                    <TableCell className="max-w-sm truncate">{message.message}</TableCell>
                    <TableCell>{message.timestamp ? format(message.timestamp.toDate(), 'PP pp') : 'N/A'}</TableCell>
                    <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => toggleReadStatus(message.id, message.isRead)}>
                            {message.isRead ? <Mail className="mr-2 h-4 w-4" /> : <MailOpen className="mr-2 h-4 w-4" />}
                            Mark as {message.isRead ? 'Unread' : 'Read'}
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500" onClick={() => handleDelete(message.id)}>
                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    </TableCell>
                </TableRow>
                )) : (
                    <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                            No messages received yet.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
            </Table>
        </CardContent>
        </Card>
    </>
  );
}
