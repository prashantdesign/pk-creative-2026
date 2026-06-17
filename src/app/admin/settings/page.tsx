import React from 'react';
import SettingsForm from '@/components/admin/settings-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import DemoDataControls from '@/components/admin/demo-data-controls';

export default function SettingsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Site Settings</h1>
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Display Options</CardTitle>
            <CardDescription>
              Control which sections are visible on your public portfolio and manage other display settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <SettingsForm />
          </CardContent>
        </Card>
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle>Danger Zone</CardTitle>
            <CardDescription>
              These actions are destructive and cannot be easily undone. Please proceed with caution.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <DemoDataControls />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
