'use client'

import { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { Item } from "./Item";
import { FileIcon, FolderIcon } from "lucide-react";
import GetAllPagesByWorkspace from "@/services/page/GetAllPagesByWorkspace";
import GetAllWorkspacesByUser from "@/services/workspace/GetAllWorkspacesByUser";
import GetUserIdFromToken from "@/services/GetUserIdFromToken";
import { UseWorkspaceStore } from "@/hooks/use-workspace-store";
import { UsePageStore } from "@/hooks/use-page-store";
import GetToken from "@/services/GetToken";
import GetAllSharedPagesByUser from "@/services/page/GetAllSharedPagesByUser";

interface PageListProps {
  workspaceId: number;
  level?: number;
  expanded: boolean;
  editable: boolean;
}

export function PageList({ workspaceId, level = 1, expanded, editable }: PageListProps) {
  const params = useParams();
  const router = useRouter();
  const pages = UsePageStore((state) => state.pagesByWorkspace[workspaceId] || []);
  const setPages = UsePageStore((state) => state.setPages);

  useEffect(() => {
    const fetchPages = async () => {
      const token = GetToken();
      if (token) {
        if (editable) {
          const response = await GetAllPagesByWorkspace(workspaceId, token);
          if (Array.isArray(response)) {
            setPages(workspaceId, response);
          } else {
            setPages(workspaceId, []);
          }
        } else {
          const userId = GetUserIdFromToken(token);
          if (userId) {
            const response = await GetAllSharedPagesByUser(userId.id, token);
            if (Array.isArray(response)) {
              setPages(workspaceId, response);
            } else {
              setPages(workspaceId, []);
            }
          }
        }
      }
    };

    fetchPages();
  }, [editable, setPages, workspaceId]);

  const onRedirect = (pageId: number) => {
    router.push(`/workspaces/${workspaceId}/pages/${pageId}`);
  };

  if (pages == null || !expanded) {
    return null;
  }

  return (
    <>
      <div key={pages.length}>
        {pages.length === 0 && (
          <p className="text-sm font-medium text-muted-foreground/80" style={{ paddingLeft: level ? `${(level * 12) + 25}px` : undefined }}>
            No pages available
          </p>
        )}
        {pages.map(page => (
          <div key={page.id}>
            <Item
              workspaceId={workspaceId}
              pageId={page.id}
              onClick={() => onRedirect(page.id)}
              label={page.title}
              icon={FileIcon}
              active={params.pageId === page.id as unknown as string}
              level={level}
              isPage={true}
              deletable={editable}
              unshare={!editable}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export function WorkspaceList() {
  const router = useRouter();
  const params = useParams();
  const [expandedWorkspaceIds, setExpandedWorkspacesIds] = useState<number[]>([]);
  const workspaces = UseWorkspaceStore((state) => state.workspaces);
  const setWorkspaces = UseWorkspaceStore((state) => state.setWorkspaces);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      const token = localStorage.getItem('jwtToken');
      if (token) {
        const userId = GetUserIdFromToken(token)?.id;
        if (userId) {
          const response = await GetAllWorkspacesByUser(userId, token);
          if (Array.isArray(response)) {
            setWorkspaces(response);
            setExpandedWorkspacesIds(response.map(workspace => workspace.id));
          } else {
            setWorkspaces([]);
          }
        }
      }
    };

    fetchWorkspaces();
  }, [setWorkspaces]);

  const toggleExpand = (workspaceId: number) => {
    setExpandedWorkspacesIds((prevExpandedWorkspaceIds) =>
      prevExpandedWorkspaceIds.includes(workspaceId)
        ? prevExpandedWorkspaceIds.filter((id) => id !== workspaceId)
        : [...prevExpandedWorkspaceIds, workspaceId]
    );
    // router.push(`/workspaces`);
  };

  if (workspaces === undefined) {
    return (
      <>
        <Item.Skeleton />
        <Item.Skeleton />
        <Item.Skeleton />
        <Item.Skeleton />
        <Item.Skeleton />
        <Item.Skeleton />
        <Item.Skeleton />
        <Item.Skeleton />
        <Item.Skeleton />
        <Item.Skeleton />
      </>
    );
  }

  return (
    <>
      {workspaces.length === 0 && (
        <p className="text-sm font-medium text-muted-foreground/80 pl-3 py-1 pr-3">
          No workspaces available
        </p>
      )}
      {workspaces.map(workspace => (
        <div key={workspace.id}>
          <Item
            workspaceId={workspace.id}
            onClick={() => toggleExpand(workspace.id)}
            label={workspace.name}
            icon={FolderIcon}
            active={params.workspaceId === workspace.id?.toString()}
            onExpand={() => toggleExpand(workspace.id)}
            expanded={expandedWorkspaceIds.includes(workspace.id)}
            isWorkspace={true}
          />
          <PageList
            workspaceId={workspace.id}
            level={1}
            expanded={expandedWorkspaceIds.includes(workspace.id)}
            editable={workspace.editable}
          />
        </div>
      ))}
    </>
  );
}