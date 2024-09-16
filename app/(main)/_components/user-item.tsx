'use client'

import { useEffect, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import GetUserById from "@/services/GetUserById";
import useLogout from "@/services/LogoutService";
import { Button } from "@/components/ui/button";
import GetUserIdFromToken from "@/services/GetUserIdFromToken";
import { UseUserStore } from "@/hooks/use-user-store";

export function UserItem() {
  const user = UseUserStore((state) => state.user);
  const setUsername = UseUserStore((state) => state.setUsername);

  const logout = useLogout();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        const userId = GetUserIdFromToken(token)?.id;
        if (userId) {
          const userData = await GetUserById(userId, token);
          if (userData) {
            setUsername(userData.username);
          }
        }
      }
    };

    fetchUser();
  }, [setUsername]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center text-sm p-3 w-full hover:bg-primary/5" role="button">
          <div className="gap-x-2 flex items-center max-w-[150px]">
            <span className="text-start font-medium line-clamp-1">
              {user?.username || 'User'}
            </span>
          </div>
          <ChevronsLeftRight className="rotate-90 ml-2 text-muted-foreground w-4 h-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80" align="start" alignOffset={11} forceMount>
        <div className="flex flex-col space-y-4 p-2">
          <p className="text-xs font-medium leading-none text-muted-foreground">
            {user?.email || 'Email'}
          </p>
          <div className="flex gap-x-2 items-center">
            <div className="space-y-1">
              <p className="text-sm line-clamp-1">
                {user?.username || 'User'}
              </p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="w-full cursor-pointer text-muted-foreground" asChild>
          <Button onClick={logout} className="text-white dark:text-black dark:hover:text-white">
            Log out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}