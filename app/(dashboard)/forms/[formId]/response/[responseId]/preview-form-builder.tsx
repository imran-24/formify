import React from "react";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";

import FormField from "@/app/(dashboard)/forms/[formId]/edit/_components/form-field";
import { Loader2 } from "lucide-react";
import { QuestionsType } from "../../edit/_components/form-builder";
import { Skeleton } from "@/components/ui/skeleton";

interface PreviewFormBuilderProps {
  questions: QuestionsType[] | null | [];
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
        {questions?.map((question, index) => {
          const response = getAnswerToQuestion(question._id);
          if (response === undefined)
            return (
              <div className='max-w-5xl w-full mx-auto flex flex-col space-y-2 bg-white rounded-lg p-6 mt-4 border shadow'>
                {/* <div className='flex items-center justify-end space-x-3'>
                    <Skeleton className='flex items-center gap-x-1 h-8 w-8'></Skeleton>
                    <Skeleton className='flex items-center gap-x-1 h-8 w-28'></Skeleton>
                  </div> */}
                <div className='flex items-center justify-between space-x-3'>
                  <Skeleton className='flex items-center gap-x-1 h-8 w-full'></Skeleton>
                </div>
                <Skeleton className='flex items-center gap-x-1 h-8 w-full'></Skeleton>
                {/* <div className='flex items-center justify-end space-x-3'>
                    <Skeleton className='flex items-center gap-x-1 h-8 w-8'></Skeleton>
                    <Skeleton className='flex items-center gap-x-1 h-8 w-8'></Skeleton>
                    <Skeleton className='flex items-center gap-x-1 h-8 w-8'></Skeleton>
                  </div> */}
              </div>
            );
          return (
            <FormField
              key={index}
              index={index}
              published={published}
              answer={response} // Pass the fetched answer.
              responseId={responseId}
              options={question.options}
              updateAnswer={() => {}}
              question={question}
              removeQuestion={() => {}}
              disabled={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PreviewFormBuilder;
