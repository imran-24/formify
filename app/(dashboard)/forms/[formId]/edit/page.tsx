"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import Navbar from "./_components/navbar";
import FormHeader from "./_components/form-header";
import { Skeleton } from "@/components/ui/skeleton";
import FormField from "./_components/form-field";
import { Loading } from "@/components/auth/loading";
import { Loader, Loader2 } from "lucide-react";
import FormBuilder from "./_components/form-builder";
import { useEffect, useState } from "react";
import { CustomError, errorList } from "@/lib/utils";

interface FormEditPageProps {
  params: {
    formId: Id<"forms">;
  };
}

const FormEditPage = ({ params }: FormEditPageProps) => {
  // const [isPublished, setIsPublished] = useState(false);
  const form = useQuery(api.form.getById, {
    formId: params.formId,
  });

  const { user } = useUser();

  const formFields = useQuery(api.formFields.get, {
    formId: params.formId,
  });

  console.log(formFields)
  // useEffect(() =>{
  //   if(form?.isPublished)
  //   setIsPublished(form.isPublished)
  // },[form?.isPublished])

  // const isEditor = form?.authorId === user?.id;
  let isPublish = form?.isPublished || false;
  // let isEditable = (isEditor && !isPublish) || false;

  if (form === null) throw new CustomError(errorList["notFound"]);

  if (form === undefined || formFields === undefined) {
    return (
      <main className='h-full max-w-full'>
        <div className='h-full flex flex-col '>
          <Navbar.Skeleton />
          <main className='bg-purple-50 w-full h-full px-6 lg:px-0'>
            <FormHeader.Skeleton />
            <div className='mt-10 flex justify-center'>
              <Loader2 className=' size-8 text-neutral-500 animate-spin' />
            </div>
            {/* <QuestionField.Skeleton /> */}
          </main>
        </div>
      </main>
    );
  }

  if (user?.id !== form?.authorId) {
    throw new CustomError(errorList["forbidden"]);
  }

  return (
    <div className='h-full max-w-full'>
      <div className='h-full flex flex-col '>
        <Navbar published={isPublish} initialData={form} />
        <div className='bg-purple-50 w-full h-full px-6 lg:px-0'>
          <FormHeader initialData={form} published={isPublish} />
          <div className='max-w-5xl w-full  mx-auto flex flex-col py-4 space-y-3'>
            <div>
              <FormBuilder published={isPublish} questions={formFields} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditPage;
