"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import Image from "next/image";
import { toast } from "sonner";

const EmptyForm = () => {
  const { mutate, pending } = useApiMutation(api.form.create);
  const onClick = () =>{
    mutate({
        title: "Untitled"
    })
    .then((id) => toast.success("Form created"))
    .catch(error => toast.error("Failed to create form"));
  }
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <Image alt='Empty' height={200} width={200} src={"/note.svg"} />
      <h2 className='text-2xl font-semibold mt-6'>Create your first form!</h2>
      <p className='text-sm mt-2 text-muted-foreground'>
        Start by creating a form for your organization
      </p>
      <div className='mt-4'>
        <Button size={"lg"} disabled={pending} onClick={onClick}>Create new form</Button>
      </div>
    </div>
  );
};

export default EmptyForm;
