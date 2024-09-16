'use client'

import React, { ElementRef, useEffect, useRef, useState } from "react";
import { ImageIcon, Smile, X } from "lucide-react";
import TextAreaAutoSize from "react-textarea-autosize";
import { useConverImage } from "@/hooks/use-cover-image";
import { Button } from "@/components/ui/button";
import { IconPicker } from "./icon-picker";
import UpdatePage from "@/services/page/UpdatePage";
import { toast } from "sonner";
import { UsePageStore } from "@/hooks/use-page-store";

interface ToolbarProps {
  initialData: {
    workspaceId: number;
    pageId: number;
    title: string;
    // icon?: string;
    coverImage?: string;
  }
  preview?: boolean;
}

export function Toolbar ({ initialData, preview } : ToolbarProps) {
  const inputRef = useRef<ElementRef<'textarea'>>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const title = UsePageStore((state) => state.title);
  const setTitle = UsePageStore((state) => state.setTitle);
  const updatePage = UsePageStore((state) => state.updatePage);
  const background = UsePageStore((state) => state.background);

  useEffect(() => {
    setTitle(initialData.title)
  }, [initialData.title, setTitle]);

  const coverImage = useConverImage();

  const enableInput = () => {
    if (preview) return;
    setIsEditing(true);
    setTimeout(() => {
      // setValue(initialData.title);
      inputRef.current?.focus();
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  }

  const onInput = async (value: string) => {
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

      // toast.promise(promise, {
      //   loading: "Updating page...",
      //   success: "Updated page",
      //   error: "Failed to update page."
      // });

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

  const onKeyDown = (event:React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      disableInput();
    }
  };

  // const onIconSelect = async (icon: string) => {
  //   
  // }

  // const onRemoveIcon = async () => {
  //
  // }

  return (
    <div className="pl-[54px] group relative">
      {/* {!!initialData.icon && !preview && (
        <div className="flex gap-x-2 items-center group/icon pt-6">
          <IconPicker onChange={onIconSelect}>
            <p className="text-6xl hover:opacity-75 transition">
              {initialData.icon}
            </p>
          </IconPicker>
          <Button 
            className="rounded-full opacity-0 group-hover/icon:opacity-100 transition text-muted-foreground text-xs" 
            variant='outline' size='icon' onClick={onRemoveIcon}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      )} */}
      {/* {!!initialData.icon && preview && (
        <p className="text-6xl pt-6">
          {initialData.icon}
        </p>
      )} */}
      <div className="opacity-0 group-hover:opacity-100 flex items-center gap-x-1 py-4">
        {/* {!initialData.icon && !preview && (
          <IconPicker asChild onChange={onIconSelect}>
            <Button className="text-muted-foreground text-xs" variant='outline' size='sm'>
              <Smile className="w-4 h-4 mr-2"/>
              Add icon
            </Button>
          </IconPicker>
        )} */}
        {!initialData.coverImage && !background && (
          <Button className="text-muted-foreground text-xs" variant='outline' size='sm' onClick={coverImage.onOpen}>
            <ImageIcon className="w-4 h-4 mr-2"/>
            Add cover
          </Button>
        )}
      </div>
      {isEditing && !preview ? (
        <TextAreaAutoSize className="text-3xl bg-transparent font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF] resize-none"
        ref={inputRef} onBlur={disableInput} onKeyDown={onKeyDown} value={title}
        onChange={e => onInput(e.target.value)} />
      ) : (
        <div className="pb-[11.5px] text-3xl font-bold break-words outline-none text-[#3F3F3F] dark:text-[#CFCFCF]" onClick={enableInput}>
          {title}
        </div>
      )}
    </div>
  );
}