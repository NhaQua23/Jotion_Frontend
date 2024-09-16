"use client"

import { SetNameWorkspace } from "@/hooks/use-name-workspace";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogClose,
  DialogTitle,
} from "../ui/dialog";
import GetUserIdFromToken from "@/services/GetUserIdFromToken";
import CreateWorkspace from "@/services/workspace/CreateWorkspace";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { UseWorkspaceStore } from "@/hooks/use-workspace-store";

export function CreateWorkspaceModal() {
  const setNameWorkspace = SetNameWorkspace();
  const addWorkspace = UseWorkspaceStore((state) => state.addWorkspace);
  const router = useRouter();
  const [name, setNameInput] = useState('');

  const handleCreate = async () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const userId = GetUserIdFromToken(token)?.id;
      if (userId) {
        const dto = {
          id: 0,
          name: name,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          userId: userId,
          editable: true,
        }
        const promise = CreateWorkspace(dto, token);

        toast.promise(promise, {
          loading: "Creating new workspace...",
          success: "New workspace created!",
          error: "Failed to create workspace."
        });

        try {
          const createdWorkspace = await promise;
          if (createdWorkspace) {
            addWorkspace(createdWorkspace);
            setNameWorkspace.onClose();
            router.push(`/workspaces`);
          }
        } catch (error) {
          console.error("Error creating workspace: ", error);
        }
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && name.trim()) {
      handleCreate();
    }
  };

  return (
    <Dialog open={setNameWorkspace.isOpen} onOpenChange={setNameWorkspace.onClose}>
      <DialogContent>
        <DialogTitle className="border-b pb-3">
          <div className="text-lg font-medium">Name the new workspace</div>
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
            onClick={handleCreate}
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