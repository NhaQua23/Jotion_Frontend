'use client'

import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { UsePageStore } from "@/hooks/use-page-store";
import UpdatePage from "@/services/page/UpdatePage";

interface TitleProps {
  initialData: {
    workspaceId: number;
    pageId: number;
    title: string;
  }
}

export function Title ({ initialData } : TitleProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  const title = UsePageStore((state) => state.title);
  const setTitle = UsePageStore((state) => state.setTitle);
  const updatePage = UsePageStore((state) => state.updatePage);

  useEffect(() => {
    setTitle(initialData.title); 
  }, [initialData.title, setTitle]);

  const enableInput = () => {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      // inputRef.current?.setSelectionRange(0,inputRef.current.value.length)
    }, 0);
  }

  const disableInput = () => {
    setIsEditing(false);
  }

  const onChange = async (value: string) => {
    setTitle(value);
    const token = localStorage.getItem('jwtToken');
    const id = initialData.pageId;

    if (token) {
      const dto = {
        id: id,
        title: value,
        background: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        workspaceId: 0,
        authorId: 0
      }
      const promise = UpdatePage(id, dto, token);

      try {
        const updatedPage = await promise;
        if (updatedPage) {
          updatePage(initialData.workspaceId, updatedPage);
        }
      } catch (error) {
        console.error("Error creating workspace: ", error);
      }
    }
  };

  const onKeyDown = (event:React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      disableInput()
    }
  }

return (
    <div className="flex gap-x-1 items-center">
      {isEditing ? (
        <Input className="h-7 px-2 focus-visible:ring-transparent" 
        ref={inputRef} onBlur={disableInput} onKeyDown={onKeyDown} value={title}
        onChange={e => onChange(e.target.value)} />
      ) : (
        <Button className="font-normal h-auto p-1" variant='ghost' size='sm' onClick={enableInput}>
          <span className="truncate">
            {title}
          </span>
        </Button>
      )}
    </div>
  )
}

Title.Skeleton = function TitleSkeleton() {
  return (
    <Skeleton className="w-20 h-8 rounded-md"/>
  )
}