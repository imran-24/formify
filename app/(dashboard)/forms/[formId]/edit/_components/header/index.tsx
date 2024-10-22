"use client";

import Logo from "@/components/logo";
import Title from "../title";
import { Doc } from "@/convex/_generated/dataModel";
import ActionButton from "./action-button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import FormHeader from "../sample/form-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  form: Doc<"forms">;
}

const Header = ({ form }: HeaderProps) => {
  const inputTitleRef = useRef<HTMLInputElement>(null);
  const inputDescriptionRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(form.title || "Untitled");
  const [description, setDescription] = useState(form?.description || "");

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  const update = useMutation(api.form.update);

  // useEffect(() =>{
  //   setTitle(form.title)
  // },[form.title])

  if (!form) return null;

  const enableInputTitle = () => {
    setTitle(form.title);
    setIsEditingTitle(true);
    setTimeout(() => {
      inputTitleRef.current?.focus();
      inputTitleRef.current?.setSelectionRange(
        0,
        inputTitleRef.current.value.length
      );
    }, 0);
  };

  const enableInputDescription = () => {
    setDescription(description);
    setIsEditingDescription(true);
    setTimeout(() => {
      inputDescriptionRef.current?.focus();
      inputDescriptionRef.current?.setSelectionRange(
        0,
        inputDescriptionRef.current.value.length
      );
    }, 0);
  };

  const disableInput = () => {
    setIsEditingTitle(false);
    setIsEditingDescription(false);
  };

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    update({
      id: form._id,
      title: event.target.value || "Untitled",
    });
  };

  const onChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
    update({
      id: form._id,
      title: title,
      descrition: event.target.value,
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      disableInput();
    }
  };
  const pathname = usePathname();

  return (
    <div className='flex flex-col '>
      <div className='relative w-full mx-auto py-3  border shadow pb-10'>
        <div className='flex items-center justify-between gap-x-6 px-6'>
          <div className='flex-1  hidden sm:flex items-center space-x-6'>
            <Logo />
            {isEditingTitle ? (
              <Input
                ref={inputTitleRef}
                onClick={enableInputTitle}
                onBlur={disableInput}
                onChange={onChangeTitle}
                onKeyDown={onKeyDown}
                value={title}
                className='h-7 px-2 focus-visible:ring-transparent'
              />
            ) : (
              <Button
                onClick={enableInputTitle}
                variant='ghost'
                size='sm'
                className='font-normal h-auto p-1'
              >
                <span className='truncate text-lg'>{title}</span>
              </Button>
            )}
          </div>
          <div className='w-full sm:w-fit '>
            <ActionButton id={form._id} title={title} />
          </div>
        </div>

        <ul className='absolute bottom-0 flex items-center justify-center w-full space-x-3 text-sm '>
          <Link href={pathname}>
            <p className='p-1 text-purple-800'>Questions</p>
            <div className='w-full h-[3px] rounded-t-full  bg-purple-800' />
          </Link>
          <Link href={"#response"}>
            <p className='p-1'>Response</p>
          </Link>

          <Link href={"#settings"}>
            <p className='p-1'>Settings</p>
          </Link>
        </ul>
      </div>
      <div className='mb-4 bg-white p-6 rounded-lg shadow border'>
        <FormHeader
          disableInput={disableInput}
          enableInputTitle={enableInputTitle}
          inputTitleRef={inputTitleRef}
          isEditingTitle={isEditingTitle}
          onChangeTitle={onChangeTitle}
          onChangeDescription={onChangeDescription}
          inputDescriptionRef={inputDescriptionRef}
          description={description}
          enableInputDescription={enableInputDescription}
          isEditingDescription={isEditingDescription}
          onKeyDown={onKeyDown}
          title={title}
        />
      </div>
    </div>
  );
};

export default Header;
