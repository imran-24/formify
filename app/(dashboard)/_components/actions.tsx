"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import ConfirmModal from "./confirm-modal";
import { Button } from "@/components/ui/button";
import { useRenameForm } from "@/stores/use-rename-modal";

interface ActionsProps {
  children: React.ReactNode;
  id: string;
  title: string;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
}

const Actions = ({ id, side, title, children, sideOffset }: ActionsProps) => {
  const { mutate, pending } = useApiMutation(api.form.remove);

  const {onOpen} = useRenameForm();
  const onCopy = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/form/${id}`)
      .then(() => toast.success("Link copied"))
      .catch(() => toast.error("Failed to copy link"));
  };

  const onDelete = () => {
    mutate({
      id: id,
    })
      .then(() => toast.success("Form deleted"))
      .catch(() => toast.error("Failed to delete form"));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        className='w-52 lg:w-40 text-sm'
        side={side}
        sideOffset={sideOffset}
      >
        <DropdownMenuItem
          onClick={onCopy}
          className='px-3 py-2 rounded-md cursor-pointer'
        >
          <Link2 className='size-4 mr-2' />
          Copy form link
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onOpen(id, title)}
          className='px-3 py-2 rounded-md cursor-pointer'
        >
          <Pencil className='size-4 mr-2' />
          Rename
        </DropdownMenuItem>
        <ConfirmModal
        disabled={pending}
        onConfirm={onDelete}
        header="Delete form?"
        description="This will delete the form and all of its content.">
          <Button
            onClick={(e) => e.stopPropagation()}
            className='px-3 py-2 rounded-md cursor-pointer w-full flex justify-start' variant={"ghost"}
          >
            <Trash2 className='size-4 mr-2' />
            Delete
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
