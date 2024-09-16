'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import {Label} from "@/components/ui//label";
import { Button } from '../ui/button';
import { useTemplate } from '@/hooks/use-template';
import GetToken from '@/services/GetToken';
import GetUserIdFromToken from '@/services/GetUserIdFromToken';
import CreateWorkspace from '@/services/workspace/CreateWorkspace';
import { UseWorkspaceStore } from '@/hooks/use-workspace-store';
import CreatePage from '@/services/page/CreatePage';
import { UsePageStore } from '@/hooks/use-page-store';
import { useRouter } from 'next/navigation';
import { PartialBlock } from '@blocknote/core';
import CreateNote from '@/services/note/CreateNote';
import { IntroductionTemplate } from './IntroductionTemplate';
import { StudyPlanTemplate } from './StudyPlanTemplate';
import { toast } from 'sonner';


export function TemplateModal () {
  const templates = useTemplate();
  const addWorkspace = UseWorkspaceStore((state) => state.addWorkspace);
  const addPage = UsePageStore((state) => state.addPage);

  const onUseIntroductionTemplate = async () => {
    const token = GetToken();
    if (token) {
      const userId = GetUserIdFromToken(token)?.id;
      if (userId) {
        const workspace = {
          id: 0,
          name: "Introduction",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          userId: userId,
          editable: true,
        }
        const createWorkspace = CreateWorkspace(workspace, token);
        try {
          const createdWorkspace = await createWorkspace;
          if (createdWorkspace) {
            addWorkspace(createdWorkspace);

            const page = {
              id: 0,
              title: "Introducing note blocks",
              background: "",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              workspaceId: createdWorkspace.id,
              authorId: userId,
            }
            const createPage = CreatePage(page, token);
            toast.promise(createPage, {
              loading: "Downloading new template...",
              success: "New template received!",
              error: "Failed to receive template."
            });
            try {
              const createdPage = await createPage;
              if (createdPage) {
                addPage(createdWorkspace.id, createdPage);
                saveToStorage(createdPage.id, IntroductionTemplate);
              }
            } catch (error) {
              console.error("Error creating page: ", error);
            }
          }
        } catch (error) {
          console.error("Error creating workspace: ", error);
        }
      }
    }
  }

  const onUseStudyPlanTemplate = async () => {
    const token = GetToken();
    if (token) {
      const userId = GetUserIdFromToken(token)?.id;
      if (userId) {
        const workspace = {
          id: 0,
          name: "Plan",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          userId: userId,
          editable: true,
        }
        const createWorkspace = CreateWorkspace(workspace, token);
        try {
          const createdWorkspace = await createWorkspace;
          if (createdWorkspace) {
            addWorkspace(createdWorkspace);

            const page = {
              id: 0,
              title: "Study Plan",
              background: "",
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              workspaceId: createdWorkspace.id,
              authorId: userId,
            }
            const createPage = CreatePage(page, token);
            toast.promise(createPage, {
              loading: "Downloading new template...",
              success: "New template received!",
              error: "Failed to receive template."
            });
            try {
              const createdPage = await createPage;
              if (createdPage) {
                addPage(createdWorkspace.id, createdPage);
                saveToStorage(createdPage.id, StudyPlanTemplate);
              }
            } catch (error) {
              console.error("Error creating page: ", error);
            }
          }
        } catch (error) {
          console.error("Error creating workspace: ", error);
        }
      }
    }
  }
  
  return (
    <Dialog open={templates.isOpen} onOpenChange={templates.onClose}>
      <DialogContent>
        <DialogTitle className="border-b pb-3">
          <div className="text-lg font-medium">Templates</div>
        </DialogTitle>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>
              Introducing note blocks
            </Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Introducing typical note blocks of the Jotion website
            </span>
          </div>
          <Button variant="ghost" onClick={onUseIntroductionTemplate}>
            Get template
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-1">
            <Label>
              Study Plan
            </Label>
            <span className="text-[0.8rem] text-muted-foreground">
              Provides a planning board to manage study and work schedules
            </span>
          </div>
          <Button variant="ghost" onClick={onUseStudyPlanTemplate}>
            Get template
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

async function saveToStorage(pageId: number, document: PartialBlock[]): Promise<void> {
  const token = GetToken();
  if (token) {
    const userId = GetUserIdFromToken(token)?.id;
    if (userId) {
      try {
        const content = JSON.stringify(document);
        const blockNoteDto = {
          id: 0,
          content: content,
          pageId: pageId,
          createdById: userId,
        }
        const response = await CreateNote(blockNoteDto, token);
        console.log("Save successful:", response);
      } catch (error) {
        console.error("Error saving content:", error);
      }
    }
  }
}