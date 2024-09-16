"use client";

import GetToken from "@/services/GetToken";
import GetStaticNote from "@/services/page/GetStaticNote";
import { useEffect, useState } from "react";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/core/style.css";

interface PreviewIdPageProps {
  params: {
    previewId: string,
  }
}

export default function PreviewIdPage ({ params }: PreviewIdPageProps) {
  const { previewId } = params;
  const [html, setHtml] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchHTML = async () => {
      const token = GetToken();
      if (token) {
        try {
          const response = await GetStaticNote(Number(previewId), token);
          setHtml(response?.content);
        } catch (error) {
          console.error("Error fetching HTML content:", error);
        }
      }
    };

    fetchHTML();
  }, [previewId, setHtml]);

  return (
    <div className="px-40 pt-20 bn-container">
      <div
        className=" bn-default-styles"
        dangerouslySetInnerHTML={{ __html: html || "" }}
      />
    </div>
  );
}