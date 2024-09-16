"use client"

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogClose,
  DialogTitle,
} from "../ui/dialog";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { UseSharePage } from "@/hooks/use-share-page";
import SharePage from "@/services/page/SharePage";
import { toast } from "sonner";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export function SharePageModal() {
  const useSharePage = UseSharePage();
  const [email, setEmailInput] = useState("");
  const [role, setRole] = useState("VIEWER");

  const handleShare = async () => {
    const token = localStorage.getItem('jwtToken');
    const pageId = useSharePage.pageId;

    if (token) {
      const emailUser = localStorage.getItem('emailUser');
      const dto = {
        id: 0,
        role: role,
        email: email,
        pageId: pageId,
        emailAuthor: emailUser,
      };
      const promise = SharePage(dto, token);

      try {
        const sharePage = await promise;
        if (sharePage) {
          useSharePage.onClose();
          toast.success("Share success");
        }
      } catch (error) {
        toast.error("Failed to share page.");
        console.error("Error share page: ", error);
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && email.trim()) {
      handleShare();
    }
  };

  return (
    <Dialog open={useSharePage.isOpen} onOpenChange={useSharePage.onClose}>
      <DialogContent>
        <DialogTitle className="border-b pb-3">
          <div className="text-lg font-medium">Share page</div>
        </DialogTitle>

        <div className="flex justify-between gap-x-2">
          <input
            type="text"
            placeholder="Add email..."
            value={email}
            onChange={(e) => setEmailInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="p-2 border rounded-md"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-auto text-left">
                {role}
                <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              <DropdownMenuItem onClick={() => setRole("OWNER")}>
                Owner
              </DropdownMenuItem>
              <div className="text-xs text-zinc-500 px-2 pb-2 mb-2 border-b-2">
                Can rename, edit, and share with others 
              </div>
              <DropdownMenuItem onClick={() => setRole("COLLABORATOR")}>
                Collaborator
              </DropdownMenuItem>
              <div className="text-xs text-zinc-500 px-2 pb-2 mb-2 border-b-2">
                Can edit
              </div>
              <DropdownMenuItem onClick={() => setRole("VIEWER")}>
                Viewer
              </DropdownMenuItem>
              <div className="text-xs text-zinc-500 px-2 pb-2">
                Can view
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <DialogFooter>
          <Button
            className="btn-secondary"
            onClick={handleShare}
            disabled={!email.trim()}
          >
            Invite
          </Button>
          <DialogClose asChild>
            <Button className="btn-cancel">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}