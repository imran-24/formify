import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import FormField from "./form-field";

export type QuestionsType = Doc<"formFields"> & {
  options: Doc<"options">[];
};

interface FormBuilderProps {
  questions: QuestionsType[] | null | [];
  published: boolean;
}

const FormBuilder: React.FC<FormBuilderProps> = ({ questions, published }) => {
  const params = useParams();
  const { formId } = params;

  const create = useMutation(api.formField.create);
  const { mutate, pending } = useApiMutation(api.formField.remove);

  const addQuestion = () => {
    create({
      formId: formId as Id<"forms">
    });
  };

  const removeQuestion = (formId: Id<"formFields">) => {
    mutate({
      id: formId,
    });
  };

  return (
    <div>
      <div className='flex flex-col-reverse gap-y-2'>
        {questions?.map((question, index) => {
          // console.log(question._id);
          

          // console.log(options);
          return (
            <FormField
              key={index}
              index={index}
              published={published}
              question={question}
              removeQuestion={removeQuestion}
              disabled={pending}
              options={question.options}
              updateAnswer={() => {}}
            />
          );
        })}
        {!published && (
          <Button
            type='button'
            onClick={addQuestion}
            size={"lg"}
            className={cn("mb-2")}
          >
            Add Question
          </Button>
        )}
      </div>
    </div>
  );
};

export default FormBuilder;
