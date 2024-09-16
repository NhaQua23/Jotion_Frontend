"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogClose,
  DialogTitle,
} from "../ui/dialog";
import { toast } from "sonner";
import React from "react";
import { Button } from "../ui/button";
import { UsePageStore } from "@/hooks/use-page-store";
import { UseUnSharePage } from "@/hooks/use-unshare-page";
import UnsharePage from "@/services/page/UnsharePage";

export function UnSharePageModal() {
  const useUnSharePage = UseUnSharePage();

  const removePage = UsePageStore((state) => state.removePage);

  const handleUnShare = async () => {
    const token = localStorage.getItem('jwtToken');
    const pageId = useUnSharePage.pageId;
    
    if (token) {
      const emailUser = localStorage.getItem('emailUser');
      const dto = {
        id: 0,
        role: "",
        email: "",
        pageId: pageId,
        emailAuthor: emailUser,
      }
      const promise = UnsharePage(dto, token);

      try {
        const unSharePage = await promise;
        if (unSharePage) {
          useUnSharePage.onClose();
          toast.success("UnShare success");
        }
      } catch (error) {
        toast.error("Failed to unshare page.");
        console.error("Error unshare page: ", error);
      }
    }
  };

  return (
    <Dialog open={useUnSharePage.isOpen} onOpenChange={useUnSharePage.onClose}>
      <DialogContent>
        <DialogTitle className="border-b pb-3">
          <div className="text-lg font-medium">Confirm to stop sharing the page</div>
        </DialogTitle>
        <DialogFooter>
          <Button
            className="btn-secondary"
            onClick={handleUnShare}
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