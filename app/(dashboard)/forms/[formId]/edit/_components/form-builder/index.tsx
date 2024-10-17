// components/FormBuilder.tsx

import React from "react";
import QuestionField from "./question-field";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";

interface FormBuilderProps {
  questions: unknown[];
//   setQuestions: React.Dispatch<React.SetStateAction<unknown[]>>;
  formId: string;
}

const FormBuilder: React.FC<FormBuilderProps> = ({ questions, formId }) => {
    const {mutate, pending} = useApiMutation(api.formField.create);
    const remove = useMutation(api.formField.remove);

  const addQuestion = () => {
    // setQuestions([
    //   ...questions,
    //   {
    //     // fieldType: "TEXT",
    //     placeholder: "Questions",
    //     required: false,
    //     order: questions.length,
    //     options: [],
    //   },
    // ]);

    mutate({
        formId,
        order: questions.length
    })
  };

  const updateQuestion = (index: number, field: any) => {
    // const updatedQuestions = questions.map((q, i) => (i === index ? field : q));
    // setQuestions(updatedQuestions);
  };

  const removeQuestion = (formId: Id<"formFields">) => {
    // const updatedQuestions = questions.filter((_, i) => i !== index);
    // setQuestions(updatedQuestions);
    remove({
        id: formId
    })
  };

  return (
    <div>
      {questions.map((question, index) => (
        <QuestionField
          key={index}
          index={index}
          question={question}
          updateQuestion={updateQuestion}
          removeQuestion={removeQuestion}
        />
      ))}
      <Button
        type="button"
        onClick={addQuestion}
        variant={"outline"}
        size={"lg"}
      >
        Add Question
      </Button>
    </div>
  );
};

export default FormBuilder;
