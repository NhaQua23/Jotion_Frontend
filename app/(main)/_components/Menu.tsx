'use client';

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LucideSquarePen, MoreHorizontal, Share2, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SetNamePage } from "@/hooks/use-name-page";
import { UseUpdatePage } from "@/hooks/use-update-page";
import { UseDelete } from "@/hooks/use-delete";
import { UseSharePage } from "@/hooks/use-share-page";
	

interface MenuProps {
  initialData: {
    workspaceId: number;
    pageId: number;
  }
}

export function Menu ({ initialData }: MenuProps) {
  const router = useRouter()
  const useUpdatePage = UseUpdatePage();
  const useSharePage = UseSharePage();
  const useDelete = UseDelete();

  const onArchive = () => {
    
  }

  const onOpenUpdatePageModal = () => {
    useUpdatePage.onOpen(initialData.workspaceId, initialData.pageId);
  };

  const onOpenSharePageModal = () => {    
    useSharePage.onOpen(initialData.workspaceId, initialData.pageId);
  };

  const onOpenDeletePageModal = () => {
    useDelete.onOpenPage(initialData.workspaceId, initialData.pageId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='sm' variant='ghost'>
          <MoreHorizontal className="w-4 h-4"/>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="end" alignOffset={8} forceMount>
        <DropdownMenuItem onClick={onOpenUpdatePageModal}>
          <LucideSquarePen className="w-4 h-4 mr-2" />
          Rename
        </DropdownMenuItem>
        <DropdownMenuSeparator/>
        <DropdownMenuItem onClick={onOpenSharePageModal}>
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </DropdownMenuItem>
        <DropdownMenuSeparator/>
        <DropdownMenuItem onClick={onOpenDeletePageModal}>
          <Trash className="w-4 h-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

Menu.Skeleton = function MenuSkeleton() {
  return (
    <Skeleton className="w-10 h-10"/>
  )
}