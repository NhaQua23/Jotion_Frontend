"use client"

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogClose,
  DialogTitle,
} from "../ui/dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { UseWorkspaceStore } from "@/hooks/use-workspace-store";
import { UseUpdateWorkspace } from "@/hooks/use-update-workspace";
import UpdateWorkspace from "@/services/workspace/UpdateWorkspace";

export function UpdateWorkspaceModal() {
  const useUpdateWorkspace = UseUpdateWorkspace();
  const updateWorkspace = UseWorkspaceStore((state) => state.updateWorkspace);
  const router = useRouter();
  const [name, setNameInput] = useState('');

  const handleUpdate = async () => {
    const token = localStorage.getItem('jwtToken');
    const id = useUpdateWorkspace.id;

    if (token) {
      const dto = {
        id: id,
        name: name,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: 0,
        editable: true,
      }
      const promise = UpdateWorkspace(id, dto, token);

      toast.promise(promise, {
        loading: "Updating workspace...",
        success: "Updated workspace",
        error: "Failed to update workspace."
      });

      try {
        const updatedWorkspace = await promise;
        if (updatedWorkspace) {
          updateWorkspace(updatedWorkspace);
          useUpdateWorkspace.onClose();
          router.push(`/workspaces`);
        }
      } catch (error) {
        console.error("Error creating workspace: ", error);
      }

    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && name.trim()) {
      handleUpdate();
    }
  };

  return (
    <Dialog open={useUpdateWorkspace.isOpen} onOpenChange={useUpdateWorkspace.onClose}>
      <DialogContent>
        <DialogTitle className="border-b pb-3">
          <div className="text-lg font-medium">Change the workspace name</div>
        </DialogTitle>
        <input
          type="text"
          placeholder="Enter a name..."
          value={name}
          onChange={(e) => setNameInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <DialogFooter>
          <Button
            className="btn-secondary"
            onClick={handleUpdate}
            disabled={!name.trim()}
          >
            Save
          </Button>
          <DialogClose asChild>
            <Button className="btn-cancel">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}