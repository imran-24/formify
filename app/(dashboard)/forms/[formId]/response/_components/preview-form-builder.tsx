import React, { FormEventHandler } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import FormField from "@/app/(dashboard)/forms/[formId]/edit/_components/form-field";
import { Loader2 } from "lucide-react";
import { QuestionsType } from "../../edit/_components/form-builder";
import { Skeleton } from "@/components/ui/skeleton";

interface PreviewFormBuilderProps {
  questions: QuestionsType[] | null | [];
  published: boolean;
  submitted: boolean;
  responseId?: Id<"responses">;
  onSubmit: () => void;
}

const PreviewFormBuilder: React.FC<PreviewFormBuilderProps> = ({
  questions,
  published,
  responseId,
  submitted,
  onSubmit,
}) => {
  // const responseAnswers = useQuery(api.responseAnswers.getAnswersByResponseId, {
  //     responseId: responseId!
  // });

  //   const params = useParams();
  //   const { formId } = params;

  const saveAnswer = useMutation(api.responseAnswer.saveAnswer);
  const submitAnswers = useMutation(api.response.update);

  const getAnswerToQuestion = (formFieldId: Id<"formFields">) => {
    const response = useQuery(api.responseAnswer.getAnswerByResponseId, {
      responseId: responseId!,
      formFieldId,
    });
    // if(response === undefined) return <div>Loading</div>
    return response;
  };

  const updateAnswer = (
    formFieldId: Id<"formFields">,
    answer: string,
    options?: any
  ) => {
    if (!responseId) throw Error("Response id is required");
    saveAnswer({
      responseId,
      formFieldId,
      answer,
      optionIds: options,
    });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!responseId) return;
    submitAnswers({
      responseId,
    })
      .then(() => {
        toast.success("Form submitted");
        onSubmit();
      })
      .catch(() => toast.error("Failed to submit the form"));
  };

  return (
    <div className='max-w-5xl w-full  mx-auto flex flex-col space-y-3'>
      <form onSubmit={handleSubmit}>
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

            // console.log(response);

            return (
              <FormField
                key={index}
                index={index}
                published={published}
                answer={response} // Pass the fetched answer.
                responseId={responseId}
                updateAnswer={updateAnswer}
                options={question.options}
                question={question}
                removeQuestion={() => {}}
                disabled={submitted}
              />
            );
          })}
        </div>
        {published && (
          <Button
            type='submit'
            // variant={"submit"}
            size={"lg"}
            disabled={submitted}
            className={cn("my-2 rounded-full border-2 h-12")}
          >
            Submit
          </Button>
        )}
      </form>
    </div>
  );
};

export default PreviewFormBuilder;
