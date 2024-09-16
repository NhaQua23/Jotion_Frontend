'use client'

import { useParams } from "next/navigation"
import { MenuIcon } from "lucide-react"
import { Title } from "./Title"
import { Banner } from "./Banner"
import { Menu } from "./Menu"
import { Publish } from "./Publish"
import { useEffect, useState } from "react"
import GetPageById from "@/services/page/GetPageById"
import GetNoteByPage from "@/services/note/GetNoteByPage"

interface NavbarProps {
  isCollapsed:boolean
  onResetWidth:() => void
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

interface NoteDto {
  id: number;
  content: string;
  pageId: number;
  createdById: number
}

export function Navbar ({ isCollapsed, onResetWidth } : NavbarProps) {
  const params = useParams();
  const workspaceId = Number(params.workspaceId);
  const pageId = String(params.pageId);
  const [document, setDocument] = useState<PageDto | null>(null);
  const [note, setNote] = useState<NoteDto | null>(null);

  useEffect(() => {
    const fetchDocument = async () => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        const response1 = await GetPageById(parseInt(pageId, 10), token);
        setDocument(response1);
        const response2 = await GetNoteByPage(parseInt(pageId, 10), token);
        setNote(response2);
      }
    };

    fetchDocument();
  }, [workspaceId, pageId]);

  if (document === undefined) {
    return  (
    <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full
      flex justify-between gap-x-4">
      <Title.Skeleton/>
      <div className="flex gap-x-2 items-center">
        <Menu.Skeleton/>
      </div>
    </nav>
    )
  }

  if (document === null) {
    return null
  }

  return (
    <div className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex gap-x-4 items-center border-b-2 border-zinc-200">
      {isCollapsed && (
        <MenuIcon className="w-6 h-6 text-muted-foreground" role="button"
          onClick={onResetWidth}
          />
      )}
      <div className="flex justify-between items-center w-full">
        <Title initialData={{
          workspaceId: workspaceId,
          pageId: Number(pageId),
          title: document.title
        }} />
        <div className="flex gap-x-2 items-center">
          <Publish initialData={{
            content: note?.content,
            pageId: Number(pageId),
            createdById: document.authorId,
            // isPublished: false,
          }} />
          <Menu initialData={{
            workspaceId: document.workspaceId,
            pageId: Number(pageId),
          }} />
        </div>
      </div>
    </div>
  );
}