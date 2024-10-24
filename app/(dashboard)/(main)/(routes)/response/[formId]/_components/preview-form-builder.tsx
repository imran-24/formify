import React, { FormEventHandler } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import FormField from "@/app/(dashboard)/forms/[formId]/edit/_components/form-field";
import { Loader2 } from "lucide-react";

interface PreviewFormBuilderProps {
  questions: unknown[];
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
      responseId,
      formFieldId,
    });
    // if(response === undefined) return <div>Loading</div>
    return response;
  };

  const updateAnswer = (formFieldId: Id<"formFields">, answer: string) => {
    if (!responseId) throw Error("Response id is required");
    saveAnswer({
      responseId,
      formFieldId,
      answer,
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
          {questions.map((question: any, index) => {
            // const response = getAnswerToQuestion(question._id);
            // if (response === undefined)
            //   return (
            //     <div className='mt-10 flex justify-center'>
            //       <Loader2 className=' size-8 text-neutral-500 animate-spin' />
            //     </div>
            //   );

            // console.log(response);

            return (
              <FormField
                key={index}
                index={index}
                published={published}
                // answer={response} // Pass the fetched answer.
                responseId={responseId}
                updateAnswer={updateAnswer}
                question={question}
                removeQuestion={() => {}}
                updateQuestion={() => {}}
              />
            );
          })}
        </div>
        {published && (
          <Button
            type='submit'
            variant={"submit"}
            size={"lg"}
            // disabled={!published}
            className={cn("my-2 font-medium")}
          >
            Submit
          </Button>
        )}
      </form>
    </div>
  );
};

export default PreviewFormBuilder;
