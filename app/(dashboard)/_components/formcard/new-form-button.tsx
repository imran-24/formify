"use client";

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";

const NewFormButton = ({disabled}: {disabled?: boolean}) => {
  const { mutate, pending } = useApiMutation(api.form.create);
  const {mutate: questionMutate} = useApiMutation(api.formField.create);
  const onClick = () => {
    mutate({
      title: "Untitled",
    })
      .then((id) => {
        questionMutate({
          formId: id,
          order: 0
        }).catch(error => console.log(error));

        toast.success("From created");
        // redirect to the newly created from {id}
      })
      .catch(() => {
        toast.error("Failed to create form");
      });
  };

  return (
    <button disabled={pending || disabled}
    onClick={onClick}
    className={cn(
      `hover:bg-blue-800 transition-colors bg-blue-600 flex flex-col items-center justify-center space-y-2 rounded-lg border p-3`,
      disabled && "opacity-75 cursor-not-allowed"
    )}
  >
      <div className='flex items-center justify-center h-full '>
        <div>
          <PlusCircle className='size-6 text-white mx-auto' />
          <p className='text-sm text-white mt-1'>New form </p>
        </div>
      </div>
    </button>
  );
};

export default NewFormButton;
