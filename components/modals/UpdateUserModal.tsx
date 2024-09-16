"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogClose,
  DialogTitle,
} from "../ui/dialog";
import { toast } from "sonner";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { UseUpdateUser } from "@/hooks/use-update-user";
import { UseUserStore } from "@/hooks/use-user-store";
import UpdateInfoUser from "@/services/UpdateInfoUser";
import GetUserIdFromToken from "@/services/GetUserIdFromToken";

export function UpdateUserModal() {
  const useUpdateUser = UseUpdateUser();
  const updateUser = UseUserStore((state) => state.updateUser);
  const [username, setUserNameInput] = useState('');

  const handleUpdate = async () => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const userId = GetUserIdFromToken(token)?.id;
      if (userId) {
        const dto = {
          id: userId,
          username: username,
          email: "",
          password: "",
        }
        const promise = UpdateInfoUser(userId, dto, token);
  
        toast.promise(promise, {
          loading: "Updating info user...",
          success: "Updated info user",
          error: "Failed to update info user."
        });
  
        try {
          const updatedUser = await promise;
          if (updatedUser) {
            updateUser(updatedUser);
            useUpdateUser.onClose();
          }
        } catch (error) {
          console.error("Error updating info user: ", error);
        }
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && username.trim()) {
      handleUpdate();
    }
  };

  return (
    <Dialog open={useUpdateUser.isOpen} onOpenChange={useUpdateUser.onClose}>
      <DialogContent>
        <DialogTitle className="border-b pb-3">
          <div className="text-lg font-medium">User Infomation</div>
        </DialogTitle>
        <input
          type="text"
          placeholder="Enter a name..."
          value={username}
          onChange={(e) => setUserNameInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <DialogFooter>
          <Button
            className="btn-secondary"
            onClick={handleUpdate}
            disabled={!username.trim()}
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