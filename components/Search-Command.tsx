"use client";

import {File} from "lucide-react";
import { useRouter } from "next/navigation";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

import { useSearch } from "@/hooks/use-search";
import { useEffect, useState } from "react";
import GetToken from "@/services/GetToken";
import GetUserIdFromToken from "@/services/GetUserIdFromToken";
import GetAllPagesByAuthor from "@/services/page/GetAllPagesByAuthor";

interface PageDto {
  id: number;
  title: string;
  background: string;
  createdAt: string;
  updatedAt: string;
  workspaceId: number;
  authorId: number;
}

export function SearchCommand () {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [documents, setDocuments] = useState<PageDto[] | null>([]);

  const toggle = useSearch(store => store.toggle);
  const isOpen = useSearch(store => store.isOpen);
  const onClose = useSearch(store => store.onClose);

  useEffect(() => {
    setIsMounted(true)
  },[]);

  useEffect(() => {
    const down = (e:KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };
    document.addEventListener('keydown',down);
    return () => document.removeEventListener('keydown',down);
  },[toggle]);

  useEffect(() => {
    const fetchDocuments = async () => {
      const token = GetToken();
      if (token) {
        const userId = GetUserIdFromToken(token);
        if (userId) {
          const response = GetAllPagesByAuthor(userId.id, token);
          if (response) {
            setDocuments(await response);
          } else {
            setDocuments([]);
          }
        }
      }
    }

    fetchDocuments();
  }, [setDocuments]);

  const onSelect = (workspaceId: number, pageId: number) => {
    router.push(`/workspaces/${workspaceId}/pages/${pageId}`);
    onClose();
  };

  if (!isMounted) {
    return null;
  };

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle className="border-b pb-3">
          <div className="text-lg font-medium">Search notes</div>
        </DialogTitle>
        <CommandInput 
          placeholder="Search your documents"
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading='Documents'>
            {documents?.map(document => (
              <CommandItem 
                key={document.id} 
                value={`${document.id}-${document.title}`}
                onSelect={() => onSelect(document.workspaceId, document.id)}
              >
                <File className="w-4 h-4 mr-2" />
                <span>{document.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </DialogContent>
    </CommandDialog>
  );
}