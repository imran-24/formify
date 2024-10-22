"use client";

import FormBuilder from "@/app/(dashboard)/forms/[formId]/edit/_components/form-builder";
import FormHeader from "@/app/(dashboard)/forms/[formId]/edit/_components/form-header";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import React, { useEffect, useState } from "react";
import PreviewFormBuilder from "./_components/preview-form-builder";

interface ResponseFormPageProps {
  params: {
    formId: Id<"forms">;
  };
}
const ResponseFormPage = ({ params }: ResponseFormPageProps) => {
  const [responseId, setResponseId] = useState<Id<"responses">>();
  const [isSubmitted, setIsSubmitted] = useState(false);

  console.log(isSubmitted);

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
        setIsSubmitted(status === "submited");
      })
      .catch((error) => console.log(error));
  }, []);

  if (form === undefined) {
    return <div>Loading</div>;
  }

  if (form === null) {
    return <div>Not found</div>;
  }

  if (formFields === undefined) {
    return <div>Fields Loading</div>;
  }

  if (isSubmitted) return <div>Form Submitted</div>;

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
