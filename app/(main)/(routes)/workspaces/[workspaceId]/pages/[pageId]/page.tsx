'use client';

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { Toolbar } from "@/components/Toolbar";
import { Cover } from "@/components/Cover";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import GetPageById from "@/services/page/GetPageById";
import { UsePageStore } from "@/hooks/use-page-store";
import GetToken from "@/services/GetToken";

const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

interface DocumentIdPageProps {
  params:{
    workspaceId: string,
    pageId: string
  }
}

interface PageDto {
  id: number;
  title: string;
  background: string;
  createdAt: string;
  updatedAt: string;
  workspaceId: number;
  authorId: number;
}

export default function DocumentIdPage ({ params } : DocumentIdPageProps) {
  const { workspaceId, pageId } = params;
  const [document, setDocument] = useState<PageDto | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const title = UsePageStore((state) => state.title);
  const setTitle = UsePageStore((state) => state.setTitle);

  const background = UsePageStore((state) => state.background);
  const setBackground = UsePageStore((state) => state.setBackground);

  useEffect(() => {
    const fetchDocument = async () => {
      const token = GetToken();
      if (token) {
        const response = await GetPageById(parseInt(pageId, 10), token);
        setDocument(response);
        setLoading(false);
        if (document?.title) {
          setTitle(document?.title);
        }
        if (document?.background) {
          setBackground(document?.background);
        } else {
          setBackground("");
        }
      }
    };

    fetchDocument();
  }, [workspaceId, pageId, setTitle, document?.title, document?.background, setBackground]);

  if (loading) {
    return (
      <div>
        <Cover.Skeleton/>
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]"/>
            <Skeleton className="h-14 w-[80%]"/>
            <Skeleton className="h-14 w-[40%]"/>
            <Skeleton className="h-14 w-[60%]"/>
          </div>
        </div>
      </div>
    );
  }

  if (document === null) {
    return <div>Not Found</div>;
  }

  return (
    <div className="p-10 pt-20">
      <Cover url={background} />
      <div className="md:max-w-3xl lg:md-max-w-4xl mx-auto">
        <Toolbar initialData={{
          workspaceId: parseInt(workspaceId, 10),
          pageId: parseInt(pageId, 10),
          title: title
        }} />
        <Editor pageId={parseInt(pageId, 10)} />
      </div>
    </div>
  );
}