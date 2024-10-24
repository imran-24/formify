"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import {
  MessageSquareText,
  MoreHorizontal,
  Pencil,
  Trash,
  Trash2,
} from "lucide-react";

import { Id } from "@/convex/_generated/dataModel";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import ConfirmModal from "./confirm-modal";
import { useApiMutation } from "@/hooks/use-api-mutation";

interface MenuProps {
  formId: Id<"forms">;
}

export const Menu = ({ formId }: MenuProps) => {
  const router = useRouter();
  const { user } = useUser();
  const { mutate, pending } = useApiMutation(api.form.remove);
  const remove = useMutation(api.form.remove);


  const onDelete = () => {
    mutate({
      id: formId,
    })
      .then(() => {
        toast.success("Form moved to trash!")
        router.push("/");
      })
      .catch(() => toast.error("Failed to delete form"));
  };


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='sm' variant='ghost'>
          <MoreHorizontal className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-60'
        align='end'
        alignOffset={8}
        forceMount
      >
        <DropdownMenuItem asChild>
          <Link href={`/forms/${formId}/edit`} className='flex items-center px-3 '>
            <Pencil className='h-4 w-4 mr-2' />
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/responses/${formId}`} className='flex items-center px-3'>
            <MessageSquareText className='h-4 w-4 mr-2' />
            Responses
          </Link>
        </DropdownMenuItem>
        <ConfirmModal
          disabled={pending}
          onConfirm={onDelete}
          header='Delete form?'
          description='This will delete the form and all of its content.'
        >
          <Button
          variant={"ghost"}
            onClick={(e) => e.stopPropagation()}
            className='w-full flex justify-start p-3 py-1'
          >
            <Trash2 className='size-4 mr-2' />
            Delete
          </Button>
        </ConfirmModal>

        <DropdownMenuSeparator />
        <div className='text-xs text-muted-foreground p-2'>
          Last edited by: {user?.firstName}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

Menu.Skeleton = function MenuSkeleton() {
  return <Skeleton className='h-10 w-10' />;
};
