"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@clerk/clerk-react";
import { useMutation } from "convex/react";
import { toast } from "sonner";
import { MessageSquareText, MoreHorizontal, Pencil, Trash } from "lucide-react";

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

interface MenuProps {
  formId: Id<"forms">;
}

export const Menu = ({ formId }: MenuProps) => {
  const router = useRouter();
  const { user } = useUser();

  const remove = useMutation(api.form.remove);

  const onRemove = () => {
    const promise = remove({ id: formId });

    toast.promise(promise, {
      loading: "Moving to trash...",
      success: "Form moved to trash!",
      error: "Failed to remove form.",
    });

    router.push("/");
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
          <Link href={`/forms/${formId}/edit`} className='flex items-center '>
            <Pencil className='h-4 w-4 mr-2' />
            Edit
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/responses/${formId}`} className='flex items-center '>
            <MessageSquareText className='h-4 w-4 mr-2' />
            Responses
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/settings/${formId}`} className='flex items-center '>
            <Trash className='h-4 w-4 mr-2' />
            Delete
          </Link>
        </DropdownMenuItem>

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
