"use client"

import { SetNamePage } from "@/hooks/use-name-page";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogClose,
  DialogTitle,
} from "../ui/dialog";
import GetUserIdFromToken from "@/services/GetUserIdFromToken";
import CreatePage from "@/services/page/CreatePage";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { UsePageStore } from "@/hooks/use-page-store";

export function CreatePageModal() {
  const setNamePage = SetNamePage();
  const addPage = UsePageStore((state) => state.addPage);
  const router = useRouter();
  const [name, setNameInput] = useState('');

  const handleCreate = async () => {
    const token = localStorage.getItem('jwtToken');
    const workspaceId = setNamePage.workspaceId;
    if (token) {
      const userId = GetUserIdFromToken(token)?.id;
      if (userId) {
        const dto = {
          id: 0,
          title: name,
          background: "",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          workspaceId: workspaceId,
          authorId: userId,
        }
        const promise = CreatePage(dto, token);

        toast.promise(promise, {
          loading: "Creating new page...",
          success: "New page created!",
          error: "Failed to create page."
        });

        try {
          const createdPage = await promise;
          if (createdPage) {
            addPage(workspaceId, createdPage);
            setNamePage.onClose();
            router.push(`/workspaces/${workspaceId}/pages/${createdPage.id}`);
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
    <Dialog open={setNamePage.isOpen} onOpenChange={setNamePage.onClose}>
      <DialogContent>
        <DialogTitle className="border-b pb-3">
          <div className="text-lg font-medium">Name the new page</div>
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