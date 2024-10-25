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
  large?: boolean;
  published?: boolean;
}

const Description = ({ initialData, large, published }: DescriptionProps) => {

  const inputRef = useRef<HTMLInputElement>(null);
  const update = useMutation(api.form.update);

  const [description, setDescription] = useState(
    initialData?.description || "UnDescriptiond"
  );
  const [isEditing, setIsEditing] = useState(false);

  const enableInput = () => {
    if (published) return disableInput();
    setDescription(initialData.description!);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  // const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setDescription(event.target.value);
  //   update({
  //     id: initialData._id,
  //     description: event.target.value || "",
  //   });
  // };

  const onChange = (content: string) => {
    setDescription(content);
    update({
      id: initialData._id,
      description: content || "",
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      disableInput();
    }
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
