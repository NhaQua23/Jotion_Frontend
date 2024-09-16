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
import { UseUpdatePage } from "@/hooks/use-update-page";
import { UsePageStore } from "@/hooks/use-page-store";
import UpdatePage from "@/services/page/UpdatePage";
import GetUserIdFromToken from "@/services/GetUserIdFromToken";

export function UpdatePageModal() {
  const useUpdatePage = UseUpdatePage();
  const router = useRouter();
  const [name, setNameInput] = useState('');
  
  const updatePage = UsePageStore((state) => state.updatePage);

  const handleUpdate = async () => {
    const token = localStorage.getItem('jwtToken');
    const workspaceId = useUpdatePage.workspaceId;
    const pageId = useUpdatePage.pageId;

    if (token) {
      const userId = GetUserIdFromToken(token)?.id;

      if (userId) {
        const dto = {
          id: pageId,
          title: name,
          background: "",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          workspaceId: 0,
          authorId: userId
        };
        const promise = UpdatePage(pageId, dto, token);
  
        toast.promise(promise, {
          loading: "Updating page...",
          success: "Updated page",
          error: "Failed to update page."
        });
  
        try {
          const updatedPage = await promise;
          if (updatedPage) {
            updatePage(workspaceId, updatedPage);
            useUpdatePage.onClose();
            router.push(`/workspaces/${workspaceId}/pages/${pageId}`);
          }
        } catch (error) {
          console.error("Error creating workspace: ", error);
        }
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && name.trim()) {
      handleUpdate();
    }
  };

  return (
    <Dialog open={useUpdatePage.isOpen} onOpenChange={useUpdatePage.onClose}>
      <DialogContent>
        <DialogTitle className="border-b pb-3">
          <div className="text-lg font-medium">Change the page title</div>
        </DialogTitle>
        <input
          type="text"
          placeholder="Enter a title..."
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