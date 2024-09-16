'use client'

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  ChevronRight,
  LucideIcon,
  LucideSquarePen,
  MoreHorizontal,
  Plus,
  Trash,
  Share2,
  Ban
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { SetNamePage } from "@/hooks/use-name-page";
import { UseDelete } from "@/hooks/use-delete";
import { UseUpdateWorkspace } from "@/hooks/use-update-workspace";
import { UseUpdatePage } from "@/hooks/use-update-page";
import { UseSharePage } from "@/hooks/use-share-page";
import { UseUnSharePage } from "@/hooks/use-unshare-page";

interface ItemProps {
  workspaceId?: number;
  pageId?: number;
  label: string;
  icon: LucideIcon;
  onClick?: () => void;
  level?: number;
  onExpand?: () => void;
  expanded?: boolean;
  documentIcon?: string;
  active?: boolean;
  isSearch?: boolean;
  isWorkspace?: boolean;
  isPage?: boolean;
  deletable?: boolean;
  unshare?: boolean;
}

export function Item({
  workspaceId = 0,
  pageId,
  label,
  icon: Icon,
  onClick,
  level = 0,
  onExpand,
  expanded,
  documentIcon,
  active,
  isSearch,
  isWorkspace = false,
  isPage = false,
  deletable = true,
  unshare = true,
}: ItemProps) {
  const router = useRouter();
  const setNamePage = SetNamePage();
  const useUpdateWorkspace = UseUpdateWorkspace();
  const useUpdatePage = UseUpdatePage();
  const useDelete = UseDelete();
  const useSharePage = UseSharePage();
  const useUnSharePage = UseUnSharePage();

  const handleExpand = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    onExpand?.();
  };

  const ChevronIcon = expanded ? ChevronDown : ChevronRight;

  const onOpenCreatePageModal = () => {
    if (isWorkspace && workspaceId) {
      setNamePage.onOpen(workspaceId);
    }
    if (expanded) {
      onExpand?.();
    }
  };

  const onOpenUpdateWorkspaceModal = () => {
    if (isWorkspace && workspaceId) {
      useUpdateWorkspace.onOpen(workspaceId);
    }
  };

  const onOpenUpdatePageModal = () => {
    if (isPage && pageId) {
      useUpdatePage.onOpen(workspaceId, pageId);
    }
  };

  const onOpenSharePageModal = () => {
    if (isPage && pageId) {
      useSharePage.onOpen(workspaceId, pageId);
    }
  }

  const onOpenUnSharePageModal = () => {
    if (pageId) {
      useUnSharePage.onOpen(pageId);
    }
  }

  const onOpenDeleteWorkspaceModal = () => {
    if (isWorkspace && workspaceId) {
      useDelete.onOpenWorkspace(workspaceId);
    }
  };

  const onOpenDeletePageModal = () => {
    if (isPage && pageId) {
      useDelete.onOpenPage(workspaceId, pageId)
    }
  };

  return (
    <div className={cn(`group min-h-[27px] text-sm py-1 pr-3 w-full hover:bg-primary/5 flex items-center text-muted-foreground font-medium`,
      active && 'bg-primary/5 text-primary')}
      onClick={onClick}
      role="button" style={{ paddingLeft: level ? `${(level * 12) + 12}px` : '12px' }}>
      {isWorkspace && (
        <div className="h-full rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 mr-1" onClick={handleExpand} role="button">
          <ChevronIcon className="w-4 h-4 shrink-0 text-muted-foreground/50" />
        </div>
      )}

      {isPage && (
        <div className="rounded-sm mr-1 w-4 h-4 shrink-0 text-muted-foreground/50"></div>
      )}

      {documentIcon ? (
        <div className="shrink-0 mr-2 text-[18px]">
          {documentIcon}
        </div>
      ) :
        <Icon className="shrink-0 w-[18px] h-[18px] mr-2 text-muted-foreground" />
      }
      <span className="truncate">
        {label}
      </span>

      {isSearch && (
        <kbd className="ml-auto pointer-events-none inline-flex gap-1 items-center h-5 select-none rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">Ctrl + K</span>
        </kbd>
      )}

      {(!!workspaceId || !!pageId) && (
        <div className="ml-auto flex items-center gap-x-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
              <div
                className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600" role="button"
              >
                <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-60" align="start" side="right" forceMount>
              {isWorkspace && (
                <DropdownMenuItem onClick={onOpenUpdateWorkspaceModal}>
                  <LucideSquarePen className="w-4 h-4 mr-2" />
                  Rename
                </DropdownMenuItem>
              )}
              {isPage && (
                <DropdownMenuItem onClick={onOpenUpdatePageModal}>
                  <LucideSquarePen className="w-4 h-4 mr-2" />
                  Rename
                </DropdownMenuItem>
              )}

              <DropdownMenuSeparator />
              
              {isPage && (
                <DropdownMenuItem onClick={onOpenSharePageModal}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </DropdownMenuItem>
              )}

              {unshare && isPage && (
                <DropdownMenuSeparator />
              )}

              {unshare && isPage && (
                <DropdownMenuItem onClick={onOpenUnSharePageModal}>
                  <Ban className="w-4 h-4 mr-2" />
                  UnShare
              </DropdownMenuItem>
              )}

              {deletable && isPage && (
                <DropdownMenuSeparator />
              )}

              {deletable && isWorkspace && (
                <DropdownMenuItem onClick={onOpenDeleteWorkspaceModal}>
                  <Trash className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              )}
              {deletable && isPage && (
                <DropdownMenuItem onClick={onOpenDeletePageModal}>
                  <Trash className="w-4 h-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {isWorkspace && (
            <div
              className="opacity-0 group-hover:opacity-100 h-full ml-auto rounded-sm hover:bg-neutral-300 dark:hover:bg-neutral-600"
              role="button"
              onClick={onOpenCreatePageModal}
            >
              <Plus className="w-4 h-4 text-muted-foreground" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

Item.Skeleton = function ItemSkeleton({ level }: { level?: number }) {
  return (
    <div className="flex gap-x-2 py-[3px]" style={{ paddingLeft: level ? `${(level * 12) + 25}px` : '12px' }}>
      <Skeleton className="w-4 h-4" />
      <Skeleton className="w-4 h-[30%]" />
      <Skeleton className="w-4 h-4" />
      <Skeleton className="w-4 h-[30%]" />
      <Skeleton className="w-4 h-4" />
      <Skeleton className="w-4 h-[30%]" />
      <Skeleton className="w-4 h-4" />
      <Skeleton className="w-4 h-[30%]" />
      <Skeleton className="w-4 h-4" />
      <Skeleton className="w-4 h-[30%]" />
    </div>
  )
}