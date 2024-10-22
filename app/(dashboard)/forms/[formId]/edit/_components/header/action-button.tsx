"use client";

import Actions from "@/app/(dashboard)/_components/actions";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";
import { UserButton } from "@clerk/nextjs";
import { Ellipsis, Palette, SendHorizonal } from "lucide-react";
import React from "react";

interface ActionButtonProps {
  id: Id<"forms">;
  title: string;
}
const ActionButton = ({ id, title }: ActionButtonProps) => {
  return (
    <div className='flex items-center  justify-between  space-x-2'>
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
        <Actions id={id} title={title}>
          <Button
            asChild
            variant={"ghost"}
            size={"icon"}
            className='cursor-pointer'
          >
            <Ellipsis className='size-4 p-2 text-neutral-700' />
          </Button>
        </Actions>
      </Hint>
      <div className='flex flex-1 justify-end'>
        <UserButton />
      </div>
    </div>
  );
};

export default ActionButton;
