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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Trash2, Mail, MailOpen, Eye, Reply } from 'lucide-react';
import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { sendAdminReply, type FormState } from '@/lib/actions';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

const initialReplyState: FormState = { message: '', error: false };

function SubmitReplyButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Sending...' : 'Send Reply'}
    </Button>
  );
}

export default function MessagesClient() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [viewMessage, setViewMessage] = React.useState<ContactMessage | null>(null);
  const [replyMessage, setReplyMessage] = React.useState<ContactMessage | null>(null);
  const [replyState, replyAction] = useActionState(sendAdminReply, initialReplyState);

  useEffect(() => {
    if (replyState.message) {
      toast({
        variant: replyState.error ? "destructive" : "default",
        title: replyState.error ? "Error" : "Success",
        description: replyState.message,
      });
      if (!replyState.error) {
        setReplyMessage(null);
      }
    }
  }, [replyState, toast]);

  const messagesQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'pkcreative_contactMessages'), orderBy('timestamp', 'desc'));
  }, [firestore]);

  const { data: messages, isLoading: loading } = useCollection<ContactMessage>(messagesQuery);
  
  const toggleReadStatus = (id: string, currentStatus: boolean) => {
    if (!firestore) return;
    const messageRef = doc(firestore, "pkcreative_contactMessages", id);
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
      const messageRef = doc(firestore, "pkcreative_contactMessages", id);
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
                             {message.services && message.services.length > 0 && (
                                 <div className="flex flex-wrap gap-1 mb-3">
                                     {message.services.map(s => <Badge key={s} variant="outline" className="text-[10px]">{s}</Badge>)}
                                 </div>
                             )}
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
                                <DropdownMenuItem onSelect={() => setTimeout(() => setViewMessage(message), 0)}>
                                    <Eye className="mr-2 h-4 w-4" /> View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => setTimeout(() => setReplyMessage(message), 0)}>
                                    <Reply className="mr-2 h-4 w-4" /> Reply
                                </DropdownMenuItem>
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
                    <TableCell className="max-w-sm truncate">
                        {message.services && message.services.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-2">
                                {message.services.map(s => <Badge key={s} variant="outline" className="text-[10px]">{s}</Badge>)}
                            </div>
                        )}
                        {message.message}
                    </TableCell>
                    <TableCell>{message.timestamp ? format(message.timestamp.toDate(), 'PP pp') : 'N/A'}</TableCell>
                    <TableCell>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => setTimeout(() => setViewMessage(message), 0)}>
                            <Eye className="mr-2 h-4 w-4" /> View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setTimeout(() => setReplyMessage(message), 0)}>
                            <Reply className="mr-2 h-4 w-4" /> Reply
                        </DropdownMenuItem>
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

        {/* View Modal */}
        <Dialog open={!!viewMessage} onOpenChange={(open) => !open && setViewMessage(null)}>
            <DialogContent className="sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle>Message Details</DialogTitle>
                </DialogHeader>
                {viewMessage && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="font-semibold">From:</span> {viewMessage.name}
                            </div>
                            <div>
                                <span className="font-semibold">Email:</span> {viewMessage.email}
                            </div>
                            <div className="col-span-2">
                                <span className="font-semibold">Received:</span> {viewMessage.timestamp ? format(viewMessage.timestamp.toDate(), 'PP pp') : 'N/A'}
                            </div>
                        </div>
                        {viewMessage.services && viewMessage.services.length > 0 && (
                            <div>
                                <span className="font-semibold text-sm">Inquiring about:</span>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {viewMessage.services.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
                                </div>
                            </div>
                        )}
                        <div className="pt-4 border-t">
                            <span className="font-semibold text-sm">Message:</span>
                            <p className="mt-2 text-sm whitespace-pre-wrap bg-muted/50 p-4 rounded-md">
                                {viewMessage.message}
                            </p>
                        </div>
                    </div>
                )}
                <DialogFooter>
                    <Button variant="outline" onClick={() => setViewMessage(null)}>Close</Button>
                    <Button onClick={() => {
                        setReplyMessage(viewMessage);
                        setViewMessage(null);
                    }}>Reply</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

        {/* Reply Modal */}
        <Dialog open={!!replyMessage} onOpenChange={(open) => !open && setReplyMessage(null)}>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Reply to {replyMessage?.name}</DialogTitle>
                </DialogHeader>
                {replyMessage && (
                    <form action={replyAction} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="toEmail">To</Label>
                            <Input id="toEmail" name="toEmail" value={replyMessage.email} readOnly className="bg-muted" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input id="subject" name="subject" defaultValue={`Re: Your inquiry to PK Creative`} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea 
                                id="message" 
                                name="message" 
                                required 
                                className="min-h-[250px]"
                                defaultValue={`\n\n\n--- Original Message from ${replyMessage.name} ---\n${replyMessage.services && replyMessage.services.length > 0 ? `Services: ${replyMessage.services.join(', ')}\n` : ''}${replyMessage.message}`}
                            />
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setReplyMessage(null)}>Cancel</Button>
                            <SubmitReplyButton />
                        </DialogFooter>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    </>
  );
}
