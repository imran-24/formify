import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";
import FormField from "./form-field";

interface FormBuilderProps {
  questions: unknown[];
  published: boolean;
}

const FormBuilder: React.FC<FormBuilderProps> = ({ questions, published }) => {
  const params = useParams();
  const { formId } = params;

  const create = useMutation(api.formField.create);
  const { mutate, pending } = useApiMutation(api.formField.remove);
  const update = useMutation(api.formField.update);

  const addQuestion = () => {
    create({
      formId: formId as Id<"forms">,
      order: questions.length,
    });
  };

  const updateQuestion = (
    id: Id<"formFields">,
    label?: string,
    required?: boolean,
    type?: string
  ) => {
    update({
      id,
      label,
      required,
      type,
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
        {questions.map((question: any, index) => (
          <FormField
            key={index}
            index={index}
            published={published}
            question={question}
            updateQuestion={updateQuestion}
            removeQuestion={removeQuestion}
            disabled={pending}
            updateAnswer={() => {}}
          />
        ))}
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
