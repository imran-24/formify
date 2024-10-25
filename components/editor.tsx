"use client";

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import * as Button from "@/components/ui/button";
import * as Select from "@/components/ui/select";
interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string | undefined;
  editable?: boolean;
}

const Editor = ({ onChange, editable, initialContent }: EditorProps) => {
  const editor = useCreateBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) : [
      {
        type: "paragraph",
        content: "Description",
      }],
    
  });

  return (
    <BlockNoteView
      editable={editable}
      editor={editor}
      formattingToolbar={true}
      linkToolbar={false}
      filePanel={false}
      sideMenu={false}
      slashMenu={true}
      tableHandles={false}
      onChange={() =>
        onChange(JSON.stringify(editor.document, null, 2))
      }
    />
  );
};

export default Editor;
