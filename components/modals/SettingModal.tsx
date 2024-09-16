'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useSettings } from "@/hooks/use-settings";
import {Label} from "@/components/ui//label";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from '../ui/button';
import { UseUpdateUser } from '@/hooks/use-update-user';

export function SettingsModal () {
  const settings = useSettings();
  const useUpdateUser = UseUpdateUser();

  const onOpenUpdateUserModal = () => {
    useUpdateUser.onOpen();
  };
  
  return (
    <Dialog open={settings.isOpen} onOpenChange={settings.onClose}>
      <DialogContent>
        <DialogTitle className="border-b pb-3">
          <div className="text-lg font-medium">My settings</div>
        </DialogTitle>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>
              Appearance
            </Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Customize how Jotion looks on your device
            </span>
          </div>
          <ModeToggle/>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>
              Personal Information
            </Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Edit personal information
            </span>
          </div>
          <Button variant="ghost" onClick={onOpenUpdateUserModal}>
            Edit
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}