'use client';

import Image from "next/image";
import { useParams } from "next/navigation";
import { ImageIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useConverImage } from "@/hooks/use-cover-image";
import { Skeleton } from "@/components//ui/skeleton";
import GetToken from "@/services/GetToken";
import GetUserIdFromToken from "@/services/GetUserIdFromToken";
import UpdatePageBackground from "@/services/page/UpdatePageBackground";
import { toast } from "sonner";
import { UsePageStore } from "@/hooks/use-page-store";
import { on } from "events";

interface CoverProps {
  url?: string;
  preview?: boolean;
}

export function Cover ({ url, preview } : CoverProps) {
  const params = useParams();
  const coverIamge = useConverImage();

  const setBackground = UsePageStore((state) => state.setBackground);

  const onRemove = async () => {
    const token = GetToken();
    const pageId = Number(params.pageId);
    
    if (token) {
      const userId = GetUserIdFromToken(token)?.id;

      if (userId) {
        const dto = {
          id: pageId,
          title: "",
          background: "",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          workspaceId: 0,
          authorId: userId
        };
        const promise = UpdatePageBackground(pageId, dto, token);

        toast.promise(promise, {
          loading: "Removing background...",
          success: "Removed background",
          error: "Failed to remove background"
        });

        setBackground("");

        console.log('Removed page background:', promise);
      }
    }
  }

return (
    <div 
      className={cn(`relative w-full h-[35vh] group`,
      !url && 'h-[12vh]',
      url && 'bg-muted')}
    >
      {!!url && (
        <Image className="object-cover" src={url} alt='Cover' fill/>
      )}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex gap-x-2 items-center">
          <Button className="text-muted-foreground text-xs" variant='outline' size='sm' onClick={() => coverIamge.onOpen()}>
            <ImageIcon className="w-4 h-4 mr-2"/>
            Change Cover
          </Button>
            <Button className="text-muted-foreground text-xs" variant='outline' size='sm' onClick={onRemove}>
            <X className="w-4 h-4 mr-2"/>
            Remove
          </Button>
        </div>
      )}
    </div>
  )
}

Cover.Skeleton = function CoverSkeleton() {
  return (
    <Skeleton className="w-full h-[12vh]"/>
  )
}