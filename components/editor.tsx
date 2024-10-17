"use client";

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";import { BlockNoteEditor } from "@blocknote/core";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
// import { useEdgeStore } from "../lib/edgestore";


interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
//   editable?: boolean;
};

const Editor = ({
  onChange,
  initialContent,
//   editable
}: EditorProps) => {
//   const { resolvedTheme } = useTheme();
//   const {edgestore} = useEdgeStore();
  
  const handleUpload = async (file: File) => {
    // const response = await edgestore.publicFiles.upload({ 
    //   file
    // });

    // return response.url;
  }

  const editor: BlockNoteEditor = useCreateBlockNote({
    // editable,
    initialContent: 
      initialContent 
      ? JSON.parse(initialContent) 
      : undefined,
    // onEditorContentChange: (editor) => {
    //   onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    // },
    // uploadFile: handleUpload
  })

  return (
    <div>
      <BlockNoteView
      editor={editor}
      // Removes all menus and toolbars.
      formattingToolbar={false}
      linkToolbar={false}
      filePanel={false}
      sideMenu={false}
      slashMenu={false}
      tableHandles={false}
    />
    </div>
  )
}

export default Editor;