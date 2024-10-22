"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { useRef, useState } from "react";

interface DescriptionProps {
  initialData: Doc<"forms">;
  large?: boolean;
  published?: boolean;
}

const Description = ({ initialData, large, published }: DescriptionProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const update = useMutation(api.form.update);

  const [description, setDescription] = useState(initialData?.description || "UnDescriptiond");
  const [isEditing, setIsEditing] = useState(false);

  const enableInput = () => {
    if(published) return disableInput();
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

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
    update({
      id: initialData._id,
      description: event.target.value || "",
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      disableInput();
    }
  };

  return (
    <div className='flex items-center gap-x-1'>
      {/* {!!initialData.icon && <p>{initialData.icon}</p>} */}
      {isEditing ? (
        <Input
          ref={inputRef}
          onClick={enableInput}
          onBlur={disableInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={description}
          className={cn(
            " px-2 focus-visible:ring-transparent",
            large && "text-4xl p-2 h-auto"
          )}
          
        />
      ) : (
        <Button
          onClick={enableInput}
          variant='ghost'
          size={large ? "lg" : "sm"}
          className={cn("font-normal h-auto p-1", 
            large && "w-full flex justify-start"
          )}
        >
          <span className={cn('truncate text-base', large && "text-4xl")}>{initialData?.description || "Description"}</span>
        </Button>
      )}
    </div>
  );
};

export default Description;
