"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { Ellipsis, Palette, SendHorizonal } from "lucide-react";
import React from "react";

const ActionButton = () => {
  return (
    <div className='flex items-center space-x-2'>
      <Hint label='Customize theme'>
        <Button
          asChild
          variant={"ghost"}
          size={"icon"}
          className='cursor-pointer'
        >
          <Palette className='size-4 p-2 text-neutral-700' />
        </Button>
      </Hint>

      <Hint label='Send'>
        <Button
          asChild
          variant={"ghost"}
          size={"icon"}
          className='cursor-pointer'
        >
          <SendHorizonal className='size-4 p-2 text-neutral-700' />
        </Button>
      </Hint>
      <Hint label='More options'>
        <Button
          asChild
          variant={"ghost"}
          size={"icon"}
          className='cursor-pointer'
        >
          <Ellipsis className='size-4 p-2 text-neutral-700' />
        </Button>
      </Hint>
      <UserButton />
    </div>
  );
};

export default ActionButton;
