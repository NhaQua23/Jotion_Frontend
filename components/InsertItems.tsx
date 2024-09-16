import { BlockNoteSchema, defaultBlockSpecs, defaultInlineContentSpecs, insertOrUpdateBlock } from "@blocknote/core";
import { CircleAlert, CircleHelp, CircleCheck, CircleX } from "lucide-react";
import { Alert } from "./Alert";
import { Question } from "./Question";
import { Answer } from "./Answer";
import { Error } from "./Error";
import { Mention } from "./Mention";

export const schema = BlockNoteSchema.create({
  blockSpecs: {
    ...defaultBlockSpecs,
    alert: Alert,
    question: Question,
    answer: Answer,
    error: Error,
  },
  inlineContentSpecs: {
    ...defaultInlineContentSpecs,
    mention: Mention,
  },
});

export const insertAlert = (editor: typeof schema.BlockNoteEditor) => ({
  title: "Alert",
  onItemClick: () => {
    insertOrUpdateBlock(editor, {
      type: "alert",
    });
  },
  aliases: [
    "warning",
    "error",
    "info",
    "success",
  ],
  group: "Other",
  icon: <CircleAlert />,
});

export const insertQuestion = (editor: typeof schema.BlockNoteEditor) => ({
  title: "Question",
  onItemClick: () => insertOrUpdateBlock(editor, { type: "question" }),
  aliases: ["alert", "info"],
  group: "Other",
  icon: <CircleHelp />,
});

export const insertAnswer = (editor: typeof schema.BlockNoteEditor) => ({
  title: "Answer",
  onItemClick: () => insertOrUpdateBlock(editor, { type: "answer" }),
  aliases: ["alert", "success"],
  group: "Other",
  icon: <CircleCheck />,
});

export const insertError = (editor: typeof schema.BlockNoteEditor) => ({
  title: "Error",
  onItemClick: () => insertOrUpdateBlock(editor, { type: "error" }),
  aliases: ["alert", "error"],
  group: "Other",
  icon: <CircleX />,
});
