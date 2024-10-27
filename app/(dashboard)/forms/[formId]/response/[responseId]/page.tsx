"use client";

import FormHeader from "@/app/(dashboard)/forms/[formId]/edit/_components/form-header";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React from "react";
import { Loader2 } from "lucide-react";
import Navbar from "../../edit/_components/navbar";
import PreviewFormBuilder from "./preview-form-builder";
import { useUser } from "@clerk/nextjs";
import { CustomError, errorList } from "@/lib/utils";
interface ResponseFormPageProps {
  params: {
    formId: Id<"forms">;
    responseId: Id<"responses">;
  };
}
const ResponseFormPage = ({ params }: ResponseFormPageProps) => {
  const {user} = useUser();
  const form = useQuery(api.form.getById, {
    formId: params.formId,
  });

  const formFields = useQuery(api.formFields.get, {
    formId: params.formId,
  });

  let isPublish = form?.isPublished || false;

  let owner = user?.id === form?.authorId;
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

  if(!owner) throw new CustomError(errorList["forbidden"])

  if (form === null) {
    return <div>Not found</div>;
  }

  return (
    <div className='h-full max-w-full'>
      <div className='h-full flex flex-col '>
        <Navbar published={isPublish} initialData={form} />
        <div className='bg-purple-50 w-full h-full px-6 lg:px-0 space-y-2'>
          <FormHeader initialData={form} published={true} />
          <div className='max-w-5xl w-full  mx-auto flex flex-col space-y-3 '>
            <div className='flex flex-col-reverse gap-y-2'>
              <PreviewFormBuilder
                published={true}
                questions={formFields}
                responseId={params.responseId}
                onSubmit={() => {}}
                submitted={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponseFormPage;
