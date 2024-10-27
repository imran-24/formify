"use client";

import FormHeader from "@/app/(dashboard)/forms/[formId]/edit/_components/form-header";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useQuery } from "convex/react";
import React, { useEffect, useState } from "react";
import PreviewFormBuilder from "./_components/preview-form-builder";
import { Loader2 } from "lucide-react";
import FormSubmission from "./_components/form-submission";

interface ResponseFormPageProps {
  params: {
    formId: Id<"forms">;
  };
}

const ResponseFormPage = ({ params }: ResponseFormPageProps) => {
  const [responseId, setResponseId] = useState<Id<"responses">>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useQuery(api.form.getById, {
    formId: params.formId,
  });

  const formFields = useQuery(api.formFields.get, {
    formId: params.formId,
  });

  const { mutate, pending } = useApiMutation(api.response.create);

  useEffect(() => {
    mutate({
      formId: params.formId,
    })
      .then(({ id, status }) => {
        setResponseId(id);
        setIsSubmitted(status === "submitted");
      })
      .catch((error) => console.log(error));
  }, []);

  if (form === undefined || formFields === undefined) {
    return (
      <main className='h-full max-w-full'>
        <div className='h-full flex flex-col '>
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

  if (form === null) {
    return <div>Not found</div>;
  }

  if (isSubmitted)
    return (
      <FormSubmission />
    );

  return (
    <main className='bg-purple-50 w-full h-full px-6 lg:px-0 space-y-2'>
      <FormHeader initialData={form} published={true} />
      <PreviewFormBuilder
        published={true}
        questions={formFields}
        responseId={responseId}
        onSubmit={() => setIsSubmitted(true)}
        submitted={isSubmitted}
      />
    </main>
  );
};

export default ResponseFormPage;
