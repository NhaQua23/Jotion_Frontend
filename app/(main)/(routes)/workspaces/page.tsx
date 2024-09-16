'use client'

import { useEffect, useState } from "react";
import GetUserIdFromToken from "@/services/GetUserIdFromToken";
import GetUserById from "@/services/GetUserById";
import { UseUserStore } from "@/hooks/use-user-store";
import Image from "next/image";

export default function WorkspacePage() {
  const user = UseUserStore((state) => state.user);
  const setUsername = UseUserStore((state) => state.setUsername);

  // const [user, setUser] = useState<{
  //   username: string,
  //   email: string,
  //   role: string
  // } | null>(null);

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
    <div className="flex flex-col justify-center items-center h-full space-y-4">
      <Image 
        src="/empty.png" 
        alt="Empty"
        width="300"
        height="300"
        style={{ width: "auto", height: "auto" }} 
        priority 
        className="dark:hidden" 
      />
      <Image 
        src="/empty-dark.png" 
        alt="Empty"
        width="300"
        height="300"
        style={{ width: "auto", height: "auto" }} 
        priority 
        className="hidden dark:block" 
      />
      <h2 className="text-lg font-medium">
        Welcome to {user?.username}&apos;s Workspace
      </h2>
    </div>
  );
}