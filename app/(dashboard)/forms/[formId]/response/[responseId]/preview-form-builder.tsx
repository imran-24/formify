import React from "react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";


import FormField from "@/app/(dashboard)/forms/[formId]/edit/_components/form-field";
import { Loader2 } from "lucide-react";

interface PreviewFormBuilderProps {
  questions: unknown[];
  published: boolean;
  submitted?: boolean;
  responseId?: Id<"responses">;
  onSubmit?: () => void;
}

const PreviewFormBuilder: React.FC<PreviewFormBuilderProps> = ({
  questions,
  published,
  responseId,
  submitted,
  onSubmit,
}) => {

  const getAnswerToQuestion = (formFieldId: Id<"formFields">) => {
    const response = useQuery(api.responseAnswer.getAnswerByResponseId, {
      responseId: responseId!,
      formFieldId,
    });
    return response;
  };


 

  return (
    <div className='max-w-5xl w-full  mx-auto flex flex-col space-y-3'>
        <div className='flex flex-col-reverse gap-y-2'>
          {questions.map((question: any, index) => {
            const response = getAnswerToQuestion(question._id);
            if (response === undefined)
              return (
                <div className='mt-10 flex justify-center'>
                  <Loader2 className=' size-8 text-neutral-500 animate-spin' />
                </div>
              );
            return (
              <FormField
                key={index}
                index={index}
                published={published}
                answer={response} // Pass the fetched answer.
                responseId={responseId}
                updateAnswer={() => {}}
                question={question}
                removeQuestion={() => {}}
                updateQuestion={() => {}}
                disabled={true}
              />
            );
          })}
        </div>
      </div>
  );
};

export default PreviewFormBuilder;
