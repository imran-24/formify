"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { SignIn, useUser } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Navbar from "@/app/(dashboard)/forms/[formId]/edit/_components/navbar";
import ResponseList from "./response-list";
import { CustomError, errorList } from "@/lib/utils";
import { useAdmin } from "@/hooks/use-admin";

interface FormResponsesPageProps {
  params: {
    formId: Id<"forms">;
  };
}

const FormResponsesPage = ({ params }: FormResponsesPageProps) => {
  const { isAdmin } = useAdmin();
  const form = useQuery(api.form.getById, {
    formId: params.formId,
  });

  const { user } = useUser();

  console.log(user?.id, form?.authorId);

  const responses = useQuery(api.responses.get, {
    formId: form?._id!,
  });

  const isEditor = form?.authorId === user?.id;
  let isPublish = form?.isPublished || false;
  let isEditable = (isEditor && !isPublish) || false;

  if (form === null) return <div>Not Found</div>;

  if (form === undefined || responses === undefined) {
    return (
      <main className='h-full max-w-full'>
        <div className='h-full flex flex-col '>
          <Navbar.Skeleton />
          <main className='bg-purple-50 w-full h-full px-6 lg:px-0'>
            <div className='mt-10 flex justify-center'>
              <Loader2 className=' size-8 text-neutral-500 animate-spin' />
            </div>
            {/* <QuestionField.Skeleton /> */}
          </main>
        </div>
      </main>
    );
  }

  if (!user) return <SignIn />;

  console.log(isAdmin);
  
  if (user.id! !== form.authorId! && !isAdmin) {
    throw new CustomError(errorList["forbidden"]);
  }

  console.log(responses);
  return (
    <div className='h-full max-w-full'>
      <div className='h-full flex flex-col '>
        <Navbar published={isPublish} initialData={form} />
        <div className='bg-purple-50 w-full h-full px-6 lg:px-0'>
          <div className='max-w-5xl w-full  mx-auto flex items-center justify-between  py-4 '>
            <h2 className='text-3xl font-medium'>
              {responses.length}{" "}
              {responses.length > 0 ? "Responses" : "Response"}
            </h2>
            <ResponseList
              formId={params.formId}
              list={responses}
              align='center'
              side='bottom'
              sideOffset={10}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormResponsesPage;
