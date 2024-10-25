"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { useRef, useState } from "react";

interface TitleProps {
  initialData: Doc<"forms">;
  large?: boolean;
  published?: boolean;
}

const Title = ({ initialData, large, published }: TitleProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const update = useMutation(api.form.update);

  const [title, setTitle] = useState(initialData?.title || "Untitled");
  const [isEditing, setIsEditing] = useState(false);

  const enableInput = () => {

    if(published) return disableInput();

    setTitle(initialData.title);
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
    setTitle(event.target.value);
    update({
      id: initialData._id,
      title: event.target.value || "Untitled",
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      disableInput();
    }
  };

  return (
    <div className='flex items-center gap-x-1 px-6'>
      {/* {!!initialData.icon && <p>{initialData.icon}</p>} */}
      {isEditing ? (
        <Input
          ref={inputRef}
          onClick={enableInput}
          onBlur={disableInput}
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={title}
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
            large && "flex justify-start"
          )}
        >
          <span className={cn('truncate text-base', large && "text-4xl")}>{initialData?.title}</span>
        </Button>
      )}
    </div>
  );
};

export default Title;

Title.Skeleton = function TitleSkeleton() {
  return (
    <div className='flex items-center gap-x-1'>
      <Skeleton className="h-8 w-20" />
    </div>
  )
}