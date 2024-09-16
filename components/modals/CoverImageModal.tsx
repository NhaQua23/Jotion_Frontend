'use client';

import { useState } from "react";
import { useParams } from "next/navigation";
import { 
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import { useConverImage } from "@/hooks/use-cover-image";
import { SingleImageDropzone } from "@/components/single-image-dropzone";
import GetToken from "@/services/GetToken";
import GetUserIdFromToken from "@/services/GetUserIdFromToken";
import { uploadFile } from "../editorUtils";
import UpdatePageBackground from "@/services/page/UpdatePageBackground";
import { UsePageStore } from "@/hooks/use-page-store";

export function CoverImageModal() {
  const params = useParams();
  const [file, setFile] = useState<File>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const coverImage = useConverImage();

  const setBackground = UsePageStore((state) => state.setBackground);

  const onClose = () => {
    setFile(undefined);
    setIsSubmitting(false);
    coverImage.onClose();
  }

  const onChange = async (file?: File) => {
    if (file) {
      setIsSubmitting(true);
      setFile(file);

      const uploadedUrl = await uploadFile(file);
      const token = GetToken();
      const pageId = Number(params.pageId);

      if (token) {
        const userId = GetUserIdFromToken(token)?.id;

        if (userId) {
          const dto = {
            id: pageId,
            title: "",
            background: uploadedUrl,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            workspaceId: 0,
            authorId: userId
          };
          const promise = UpdatePageBackground(pageId, dto, token);

          console.log('Updated page background:', promise);
        }
      }

      setBackground(uploadedUrl);

      onClose();
    }
  };

return (
    <Dialog open={coverImage.isOpen} onOpenChange={coverImage.onClose}>
      <DialogContent>
        <DialogTitle>
          <div className="text-center text-lg font-semibold">
            Cover Image
          </div>
        </DialogTitle>
        <SingleImageDropzone className="w-full outline-none"
        disabled={isSubmitting}
        value={file}
        onChange={onChange}/>
      </DialogContent>
    </Dialog>
  );
}