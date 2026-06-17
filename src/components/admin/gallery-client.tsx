"use client";

import React, { useMemo } from 'react';
import { collection, query, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { useFirestore, useCollection } from '@/firebase';
import type { GalleryImage } from '@/types';
import Image from 'next/image';
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
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '../ui/card';
import { Skeleton } from '../ui/skeleton';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

export default function GalleryClient() {
  const router = useRouter();
  const { toast } = useToast();
  const firestore = useFirestore();

  const galleryQuery = useMemo(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'galleryImages'), orderBy('order', 'asc'));
  }, [firestore]);

  const { data: images, loading } = useCollection<GalleryImage>(galleryQuery);

  const handleDelete = (id: string) => {
      if (!firestore || !window.confirm("Are you sure you want to delete this image?")) return;
      const imageRef = doc(firestore, "galleryImages", id);
      deleteDoc(imageRef)
        .then(() => {
            toast({ title: "Image deleted successfully." });
        })
        .catch((serverError) => {
            toast({ variant: "destructive", title: "Failed to delete image." });
            const permissionError = new FirestorePermissionError({
              path: imageRef.path,
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
            {images && images.length > 0 ? (
                images.map((image) => (
                    <Card key={image.id}>
                        <CardHeader className="p-0">
                             <Image
                                src={image.imageUrl}
                                alt={image.title}
                                width={400}
                                height={300}
                                className="rounded-t-lg object-cover aspect-video"
                            />
                        </CardHeader>
                        <CardContent className="p-4">
                            <p className="font-medium">{image.title}</p>
                            <p className="text-sm text-muted-foreground">Order: {image.order}</p>
                        </CardContent>
                        <CardFooter className="flex justify-end p-4 pt-0">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button size="icon" variant="ghost">
                                        <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => router.push(`/admin/gallery/edit/${image.id}`)}>
                                        <Pencil className="mr-2 h-4 w-4" /> Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-500" onClick={() => handleDelete(image.id)}>
                                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardFooter>
                    </Card>
                ))
            ) : (
                 <div className="text-center text-muted-foreground py-12 col-span-full">
                    No images found in gallery.
                </div>
            )}
        </div>

        {/* Desktop View */}
        <Card className="hidden md:block">
            <CardContent>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead>
                        <span className="sr-only">Actions</span>
                    </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {images && images.length > 0 ? (
                        images.map((image) => (
                            <TableRow key={image.id}>
                            <TableCell>
                                <Image
                                    src={image.imageUrl}
                                    alt={image.title}
                                    width={80}
                                    height={80}
                                    className="rounded-md object-cover"
                                />
                            </TableCell>
                            <TableCell className="font-medium">{image.title}</TableCell>
                            <TableCell>{image.order}</TableCell>
                            <TableCell>
                                <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button aria-haspopup="true" size="icon" variant="ghost">
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Toggle menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                    <DropdownMenuItem onClick={() => router.push(`/admin/gallery/edit/${image.id}`)}>
                                        <Pencil className="mr-2 h-4 w-4" /> Edit
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-500" onClick={() => handleDelete(image.id)}>
                                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="h-24 text-center">
                                No images found in gallery.
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
