"use client";

import GetToken from "@/services/GetToken";
import GetUserIdFromToken from "@/services/GetUserIdFromToken";
import CreateNote from "@/services/note/CreateNote";
import GetNoteByPage from "@/services/note/GetNoteByPage";
import { Block, BlockNoteEditor, filterSuggestionItems, PartialBlock } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";
import { DefaultReactGridSuggestionItem, getDefaultReactSlashMenuItems, GridSuggestionMenuController, GridSuggestionMenuProps, SuggestionMenuController } from "@blocknote/react";
import { 
  schema,
  insertAlert,
  insertAnswer,
  insertError,
  insertQuestion, 
} from "@/components/InsertItems";
import { getMentionMenuItems, uploadFile, exportHTML } from "@/components/editorUtils";

interface EditorProps {
  pageId: number;
}

export default function Editor({ pageId }: EditorProps) {
  const {resolvedTheme} = useTheme();
  const [initialContent, setInitialContent] = useState<
    Block[] | undefined | "loading"
  >("loading");

  useEffect(() => {
    loadFromStorage(pageId).then((content) => {
      setInitialContent(content);
    });
  }, [pageId]);

  const editor = useMemo(() => {
    if (initialContent === "loading") {
      return undefined;
    }
    return BlockNoteEditor.create({ 
      schema,
      initialContent, 
      uploadFile,
    });
  }, [initialContent]);

  if (!editor) {
    return "Loading content...";
  }  

  return (
    <BlockNoteView
      editor={editor}
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      onChange={async () => {
        const partialDocument: PartialBlock[] = editor.document as Block[];
        await saveToStorage(pageId, partialDocument);

        const staticDocument = editor.blocksToHTMLLossy(editor.document);
        await exportHTML(pageId, await staticDocument);
      }}
      slashMenu={false}
      formattingToolbar={true}
      emojiPicker={false}
    >
      <SuggestionMenuController
        triggerCharacter={"/"}
        getItems={async (query) =>
          filterSuggestionItems(
            [
              ...getDefaultReactSlashMenuItems(editor),
              insertAlert(editor),
              insertQuestion(editor),
              insertAnswer(editor),
              insertError(editor),
            ],
            query
          )
        }
      />
      <GridSuggestionMenuController
        triggerCharacter={":"}
        // gridSuggestionMenuComponent={CustomEmojiPicker}
        columns={5}
        minQueryLength={0}
      />
      <GridSuggestionMenuController
        triggerCharacter={"@"}
        getItems={async (query) =>
          filterSuggestionItems(
            getMentionMenuItems(editor).map((item) => ({
              ...item,
              title: item.id,
            })),
            query
          ) as DefaultReactGridSuggestionItem[]
        }
        columns={2}
        minQueryLength={2}
      />
      {/* <div className={"item bordered"}>
        <pre>
          <code>{JSON.stringify(initialContent, null, 2)}</code>
        </pre>
      </div> */}
    </BlockNoteView>
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

async function loadFromStorage(pageId: number): Promise<Block[] | undefined> {
  const token = GetToken();
  if (token) {
    try {
      const response = await GetNoteByPage(pageId, token);  
      const data = response?.content;
      return data ? (JSON.parse(data) as Block[]) : undefined;
    } catch (error) {
      console.error("Error loading content:", error);
      return undefined;
    }
  }
}