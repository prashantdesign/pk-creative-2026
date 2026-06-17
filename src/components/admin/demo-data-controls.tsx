'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useFirestore, useUser } from '@/firebase';
import { collection, writeBatch, getDocs, doc } from 'firebase/firestore';
import { 
  DEMO_PROJECT_CATEGORIES, 
  DEMO_PROJECTS_RAW,
  DEMO_GALLERY_CATEGORIES,
  DEMO_GALLERY_IMAGES_RAW,
  DEMO_SITE_CONTENT
} from '@/lib/demo-data';
import PasswordPromptDialog from './password-prompt-dialog';
import type { ProjectCategory, GalleryCategory } from '@/types';

export default function DemoDataControls() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionToConfirm, setActionToConfirm] = useState<'fill' | 'reset' | null>(null);
  
  const { toast } = useToast();
  const firestore = useFirestore();

  const handleFillData = async () => {
    if (!firestore) return;
    setIsSubmitting(true);
    toast({ title: 'Populating portfolio...', description: 'Please wait.' });

    try {
      const batch = writeBatch(firestore);
      
      // 1. Set Site Content
      const siteContentRef = doc(firestore, 'siteContent', 'global');
      batch.set(siteContentRef, DEMO_SITE_CONTENT);

      // 2. Create Project Categories and get their IDs
      const projCategoryPromises = DEMO_PROJECT_CATEGORIES.map(category => {
        const docRef = doc(collection(firestore, 'projectCategories'));
        batch.set(docRef, category);
        return { ...category, id: docRef.id };
      });
      const createdProjCategories = projCategoryPromises;
      
      const projCategoryNameIdMap = createdProjCategories.reduce((acc, cat) => {
        acc[cat.name] = cat.id;
        return acc;
      }, {} as Record<string, string>);

      // 3. Create Projects with correct category IDs
      DEMO_PROJECTS_RAW.forEach(project => {
        const { categoryName, ...projectData } = project;
        const projectCategoryId = projCategoryNameIdMap[categoryName];
        if (projectCategoryId) {
          const docRef = doc(collection(firestore, 'projects'));
          batch.set(docRef, { ...projectData, projectCategoryId });
        }
      });

      // 4. Create Gallery Categories and get their IDs
      const galleryCategoryPromises = DEMO_GALLERY_CATEGORIES.map(category => {
        const docRef = doc(collection(firestore, 'galleryCategories'));
        batch.set(docRef, category);
        return { ...category, id: docRef.id };
      });
      const createdGalleryCategories = galleryCategoryPromises;

      const galleryCategoryNameIdMap = createdGalleryCategories.reduce((acc, cat) => {
        acc[cat.name] = cat.id;
        return acc;
      }, {} as Record<string, string>);

      // 5. Create Gallery Images with correct category IDs
      DEMO_GALLERY_IMAGES_RAW.forEach(image => {
        const { categoryName, ...imageData } = image;
        const galleryCategoryId = galleryCategoryNameIdMap[categoryName];
        if (galleryCategoryId) {
          const docRef = doc(collection(firestore, 'galleryImages'));
          batch.set(docRef, { ...imageData, galleryCategoryId });
        }
      });

      await batch.commit();
      toast({ title: 'Success!', description: 'Portfolio has been populated with demo data.' });
    } catch (error: any) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not populate portfolio.' });
    } finally {
      setIsSubmitting(false);
      setDialogOpen(false);
    }
  };

  const handleResetData = async () => {
    if (!firestore) return;
    setIsSubmitting(true);
    toast({ title: 'Resetting portfolio...', description: 'This may take a moment.' });
    
    try {
      const collectionsToClear = ['projects', 'projectCategories', 'galleryImages', 'galleryCategories', 'siteContent', 'contactMessages'];
      const batch = writeBatch(firestore);

      for (const coll of collectionsToClear) {
        const snapshot = await getDocs(collection(firestore, coll));
        snapshot.forEach(doc => {
          batch.delete(doc.ref);
        });
      }

      await batch.commit();
      toast({ title: 'Success!', description: 'All portfolio data has been reset.' });
    } catch (error: any) {
      console.error(error);
      toast({ variant: 'destructive', title: 'Error', description: 'Could not reset portfolio data.' });
    } finally {
      setIsSubmitting(false);
      setDialogOpen(false);
    }
  };
  
  const onConfirm = () => {
    if (actionToConfirm === 'fill') {
      handleFillData();
    } else if (actionToConfirm === 'reset') {
      handleResetData();
    }
  };

  const openConfirmation = (action: 'fill' | 'reset') => {
    setActionToConfirm(action);
    setDialogOpen(true);
  };

  return (
    <>
      <PasswordPromptDialog
        isOpen={dialogOpen}
        onOpenChange={setDialogOpen}
        onConfirm={onConfirm}
        isSubmitting={isSubmitting}
        action={actionToConfirm}
      />
      <div className="space-y-4">
        <div className="p-4 border rounded-lg">
          <h4 className="font-semibold">Fill with Demo Data</h4>
          <p className="text-sm text-muted-foreground mb-2">
            Populate your portfolio with sample projects and categories. This is great for seeing how your site will look.
          </p>
          <Button variant="outline" onClick={() => openConfirmation('fill')} disabled={isSubmitting}>
            Fill with Demo Data
          </Button>
        </div>
        <div className="p-4 border rounded-lg border-destructive/50">
          <h4 className="font-semibold text-destructive">Clear All Portfolio Data</h4>
          <p className="text-sm text-muted-foreground mb-2">
            This will permanently delete all projects, galleries, categories, site content, and messages. This action cannot be undone.
          </p>
          <Button variant="destructive" onClick={() => openConfirmation('reset')} disabled={isSubmitting}>
            Clear All Data
          </Button>
        </div>
      </div>
    </>
  );
}
