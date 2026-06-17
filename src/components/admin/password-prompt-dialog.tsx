'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth, useUser } from '@/firebase';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

interface PasswordPromptDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isSubmitting: boolean;
  action: 'fill' | 'reset' | null;
}

export default function PasswordPromptDialog({
  isOpen,
  onOpenChange,
  onConfirm,
  isSubmitting,
  action,
}: PasswordPromptDialogProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  
  const auth = useAuth();
  const { user } = useUser();
  const { toast } = useToast();

  const handleVerification = async () => {
    if (!user || !user.email || !password) {
      setError('Password is required.');
      return;
    }

    setIsVerifying(true);
    setError('');

    try {
      const credential = EmailAuthProvider.credential(user.email, password);
      await reauthenticateWithCredential(user, credential);
      toast({ title: 'Authentication successful.' });
      onConfirm();
    } catch (err: any) {
      console.error(err);
      setError('Incorrect password. Please try again.');
    } finally {
      setIsVerifying(false);
      setPassword('');
    }
  };

  const handleClose = () => {
    if (isSubmitting || isVerifying) return;
    setPassword('');
    setError('');
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Admin Confirmation</DialogTitle>
          <DialogDescription>
            To {action === 'fill' ? 'add demo data' : 'reset your portfolio'}, please enter your password to confirm this action.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isVerifying || isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleVerification} disabled={isVerifying || isSubmitting || !password}>
            {isVerifying ? 'Verifying...' : 'Confirm'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
