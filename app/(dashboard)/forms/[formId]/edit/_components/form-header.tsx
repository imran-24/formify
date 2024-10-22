"use client";

import { Doc } from "@/convex/_generated/dataModel";
import Title from "./title";
import { useMemo } from "react";
import dynamic from "next/dynamic";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Description from "./description";
import { Skeleton } from "@/components/ui/skeleton";

interface FormHeaderProps {
  initialData: Doc<"forms">;
  published?: boolean;
}

const FormHeader = ({ initialData, published = false }: FormHeaderProps) => {
  const Editor = useMemo(
    () => dynamic(() => import("@/components/editor"), { ssr: false }),
    []
  );
  const update = useMutation(api.form.update);

//   const onChange = (content: string) => {
//     update({
//       id: initialData._id,
//       descrition: content,
//     });
//   };
  return (
    <div className='max-w-5xl w-full mx-auto flex flex-col space-y-2 bg-white rounded-lg p-6 mt-4 border shadow'>
      <Title published={published} large={true} initialData={initialData} />
      <Description published={published} initialData={initialData} />
      {/* <Editor onChange={onChange} initialContent={initialData.description} /> */}
    </div>
  );
};

export default FormHeader;

FormHeader.Skeleton = function FormHeaderSkeleton() {
  return (
    <div className='max-w-5xl w-full mx-auto flex flex-col space-y-2 bg-white rounded-lg p-6 mt-4 border shadow'>
      <Skeleton className='flex items-center gap-x-1 h-14 w-48'></Skeleton>
      <Skeleton className='flex items-center gap-x-1 h-10 w-full'></Skeleton>
    </div>
  );
};

{/* <div className='border p-4 rounded bg-white '>
      <div className='flex justify-between items-center'>
        <Skeleton className='h-8 w-20' />
      </div>
    </div> */}