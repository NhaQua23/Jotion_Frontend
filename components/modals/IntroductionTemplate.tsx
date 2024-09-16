import { PartialBlock } from "@blocknote/core";

export const IntroductionTemplate: PartialBlock[] = [
  {
    type: "paragraph",
    content: "Welcome to Jotion's introduction page!",
  },
  {
    type: "paragraph",
  },
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "This is a Block:",
        styles: { bold: true },
      },
    ],
  },
  {
    type: "paragraph",
    content: "This is a paragraph block",
  },
  {
    type: "heading",
    content: "This is Heading 1",
  },
  {
    type: "bulletListItem",
    content: "This is Bullet List Item",
  },
  {
    type: "numberedListItem",
    content: "This is Numbered List Item",
  },
  {
    type: "checkListItem",
    content: "This is Check List Item",
  },
  {
    type: "paragraph",
    content: "This is a table block",
  },
  {
    type: "table",
    content: {
      type: "tableContent",
      rows: [
        {
          cells: ["Table Cell", "Table Cell", "Table Cell"],
        },
        {
          cells: ["Table Cell", "Table Cell", "Table Cell"],
        },
        {
          cells: ["Table Cell", "Table Cell", "Table Cell"],
        },
      ],
    },
  },
  {
    type: "file",
  },
  {
    type: "paragraph",
    content: "This is a image block",
  },
  {
    type: "image",
    props: {
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
      caption:
        "From https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg",
    },
  },
  {
    type: "paragraph",
    content: "This is a video block",
  },
  {
    type: "video",
    props: {
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
      caption:
        "From https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm",
    },
  },
  {
    type: "paragraph",
    content: "This is a audio block",
  },
  {
    type: "audio",
    props: {
      url: "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3",
      caption:
        "From https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3",
    },
  },
  {
    type: "paragraph",
  },
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "Inline Content:",
        styles: { bold: true },
      },
    ],
  },
  {
    type: "paragraph",
    content: [
      {
        type: "text",
        text: "You can style the text",
        styles: {
          bold: true,
          italic: true,
          textColor: "red",
          backgroundColor: "blue",
        },
      },
      {
        type: "text",
        text: " ",
        styles: {},
      },
      {
        type: "link",
        content: "Link",
        href: "https://www.blocknotejs.org",
      },
    ],
  },
  {
    type: "paragraph",
  },
];
