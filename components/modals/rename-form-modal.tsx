"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRenameForm } from "@/stores/use-rename-modal";
import { FormEventHandler, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const RenameFormModal = () => {
  const { isOpen, onClose, defaultValue } = useRenameForm();
  const {mutate, pending} = useApiMutation(api.form.update);
  const [title, setTitle] = useState(defaultValue.title);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!title) setTitle("Untitled");

    mutate({
      id: defaultValue.id,
      title: title
    })
    .then(() => {
      toast.success("Form title renamed");
      onClose();
    })
    .catch(() => toast.error("Failed renaming form title"))
  };

  useEffect(() => {
    setTitle(defaultValue.title);
  }, [defaultValue.title]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit form title?</DialogTitle>
          <DialogDescription>Enter a new title for this form</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input
            placeholder='Form title'
            disabled={false}
            required
            maxLength={60}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <DialogFooter className='flex items-center mt-4'>
            <DialogClose className='w-full'>
              <Button type='button' className='w-full' variant={"outline"}>
                Close
              </Button>
            </DialogClose>
            <Button type='submit' className='w-full'>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RenameFormModal;
