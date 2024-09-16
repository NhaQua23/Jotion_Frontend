"use client"

import { UseDelete } from "@/hooks/use-delete";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogClose,
  DialogTitle,
} from "../ui/dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import DeleteWorkspace from "@/services/workspace/DeleteWorkspace";
import DeletePage from "@/services/page/DeletePage";
import { UseWorkspaceStore } from "@/hooks/use-workspace-store";
import { UsePageStore } from "@/hooks/use-page-store";

export function DeleteModal() {
  const useDelete = UseDelete();
  const removeWorkspace = UseWorkspaceStore((state) => state.removeWorkspace);
  const removePage = UsePageStore((state) => state.removePage);
  const router = useRouter();

  const handleDelete = async () => {
    const token = localStorage.getItem('jwtToken');
    const isWorkspace = useDelete.isWorkspace;
    const isPage = useDelete.isPage;

    if (token) {
      if (isWorkspace) {
        const id = useDelete.workspaceId;
        const promise = DeleteWorkspace(id, token);
        removeWorkspace(id);

        toast.promise(promise, {
          success: "Workspace successfully deleted.",
          error: "Failed to delete workspace."
        });

        router.push('/workspaces');
      } else if (isPage) {
        const id = useDelete.pageId;
        const promise = DeletePage(id, token);
        await promise;
        removePage(useDelete.workspaceId, id);

        toast.promise(promise, {
          success: "Page successfully deleted.",
          error: "Failed to delete note."
        });

        router.push('/workspaces');
      }

      useDelete.onClose();
    }
  };

  return (
    <Dialog open={useDelete.isOpen} onOpenChange={useDelete.onClose}>
      <DialogContent>
        <DialogTitle className="border-b pb-3">
          <div className="text-lg font-medium">Confirm deletion (Action cannot be undone)</div>
        </DialogTitle>
        <DialogFooter>
          <Button
            className="btn-secondary"
            onClick={handleDelete}
          >
            Confirm
          </Button>
          <DialogClose asChild>
            <Button className="btn-cancel">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}