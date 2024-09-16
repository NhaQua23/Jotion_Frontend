import GetToken from "@/services/GetToken";
import GetUserIdFromToken from "@/services/GetUserIdFromToken";
import CreateStaticNote from "@/services/page/CreateStaticNote";
import { schema } from "./InsertItems";
import { DefaultReactGridSuggestionItem } from "@blocknote/react";

export const getMentionMenuItems = (
  editor: typeof schema.BlockNoteEditor
): DefaultReactGridSuggestionItem[] => {
  const users = ["Steve", "Bob", "Joe", "Mike"];
 
  return users.map((user) => ({
    id: user,
    onItemClick: () => {
      editor.insertInlineContent([
        {
          type: "mention",
          props: {
            user,
          },
        },
        " ", // add a space after the mention
      ]);
    },
    icon: <p>{user.substring(0, 1)}</p>,
  }));
};

export async function uploadFile(file: File) {
  const body = new FormData();
  body.append("file", file);

  const response = await fetch("https://tmpfiles.org/api/v1/upload", {
    method: "POST",
    body: body,
  });

  return (await response.json()).data.url.replace(
    "tmpfiles.org/",
    "tmpfiles.org/dl/"
  );
}

export async function exportHTML(pageId: number, file: string): Promise<void> {
  const token = GetToken();
  if (token) {
    const userId = GetUserIdFromToken(token)?.id;
    if (userId) {
      try {
        const staticNoteDto = {
          id: 0,
          content: file,
          pageId: pageId,
          userId: userId,
        }
        const response = await CreateStaticNote(staticNoteDto, token);
        console.log("Static Note:", response);
      } catch (error) {
        console.error("Static Note:", error);
      }
    }
  }
}