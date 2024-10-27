"use client";

import Editor from "@/components/editor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import dynamic from "next/dynamic";
import { useMemo, useRef, useState } from "react";

interface DescriptionProps {
  initialData: Doc<"forms">;
  published?: boolean;
}

const Description = ({ initialData, published }: DescriptionProps) => {
  const update = useMutation(api.form.update);

  const onChange = (content: string) => {
    if (published) return;
    update({
      id: initialData._id,
      description: content || "",
    });
  };

  return (
    <Editor
      editable={!published}
      onChange={onChange}
      initialContent={initialData.description}
    />
    // </div>
  );
};

export default Description;
