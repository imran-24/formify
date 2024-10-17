"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LegacyRef } from "react";

interface FormHeaderProps {
  title: string;
  description?: string;
  enableInputTitle: () => void;
  enableInputDescription?: () => void;
  isEditingTitle: boolean;
  isEditingDescription?: boolean;
  disableInput: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChangeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDescription?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputTitleRef: LegacyRef<HTMLInputElement>;
  inputDescriptionRef: LegacyRef<HTMLInputElement>;
}

const FormHeader = ({
  disableInput,
  enableInputDescription,
  enableInputTitle,
  isEditingDescription,
  isEditingTitle,
  onKeyDown,
  title,
  description,
  inputTitleRef,
  inputDescriptionRef,
  onChangeDescription,
  onChangeTitle,
}: FormHeaderProps) => {
  return (
    <div className="flex flex-col space-y-2">
      {isEditingTitle ? (
        <Input
          ref={inputTitleRef}
          onClick={enableInputTitle}
          onBlur={disableInput}
          onChange={onChangeTitle}
          onKeyDown={onKeyDown}
          value={title}
          className='text-4xl focus-visible:ring-transparent p-2 h-auto'
        />
      ) : (
        <Button
          onClick={enableInputTitle}
          variant='ghost'
          size='sm'
          className='font-normal h-auto p-1 flex justify-start'
        >
          <span className='truncate text-4xl'>{title}</span>
        </Button>
      )}
      {isEditingDescription ? (
        <Input
          ref={inputDescriptionRef}
          onClick={enableInputDescription}
          onBlur={disableInput}
          onChange={onChangeDescription}
          onKeyDown={onKeyDown}
          value={description}
          placeholder="Form description"
          className='focus-visible:ring-transparent p-3'
        />
      ) : (
        <Button
          onClick={enableInputDescription}
          variant='ghost'
          size='sm'
          className='font-normal h-auto p-2 flex justify-start'
        >
          <span className='truncate text-base'>{description || "Form description"}</span>
        </Button>
      )}
    </div>
  );
};

export default FormHeader;
