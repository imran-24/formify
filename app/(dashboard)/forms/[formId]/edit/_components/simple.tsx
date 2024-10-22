// "use client";

// import { useQuery } from "convex/react";
// import { Id } from "@/convex/_generated/dataModel";
// import { api } from "@/convex/_generated/api";
// import Navbar from "./_components/navbar";
// import FormHeader from "./_components/form-header";

// interface DashboardLayout {
//   children: React.ReactNode;
//   params: {
//     formId: Id<"forms">;
//   };
// }

// const FormEditLayout = ({ children, params }: DashboardLayout) => {
//   const form = useQuery(api.form.getById, {
//     formId: params.formId,
//   });

//   if (form !== undefined) {
//     return (
//       <main className='h-full max-w-full'>
//         <div className='h-full flex flex-col '>
//           <Navbar.Skeleton />
//           <main className='bg-purple-50 w-full h-full px-6 lg:px-0'>
//             <FormHeader.Skeleton  />
//             {children}
//           </main>
//         </div>
//       </main>
//     );
//   }

//   if (form === null) {
//     return <div>Not found</div>;
//   }

//   // return (
//   //   <div className='h-full max-w-full'>
//   //     <div className='h-full flex flex-col '>
//   //       <Navbar initialData={form} />
//   //       <main className='bg-purple-50 w-full h-full px-6 lg:px-0'>
//   //         <FormHeader initialData={form} editable={true} />
//   //         {children}
//   //       </main>
//   //     </div>
//   //   </div>
//   // );
// };

// export default FormEditLayout;


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

import { Id } from "@/convex/_generated/dataModel";
import { Trash2 } from "lucide-react";
import React, { useState } from "react";

interface QuestionFieldProps {
  index: number;
  question: any;
  answer?: any;
  responseId?: Id<"responses">;
  updateAnswer: (formFieldId: Id<"formFields">, answer: string) => void;
  updateQuestion: (id: Id<"formFields">, label: string) => void;
  disabled: boolean;
  removeQuestion: (formId: Id<"formFields">) => void;
}

const QuestionField: React.FC<QuestionFieldProps> = ({
  index,
  answer,
  question,
  updateQuestion,
  removeQuestion,
  updateAnswer,
  responseId,
  disabled,
}) => {


  const [label, setLabel] = useState(question.label);
  const [response, setResponse] = useState(answer?.answer || "");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setLabel(e.target.value);
    updateQuestion(question._id, label);
    // const { name, value, type, checked } = e.target;
    // const fieldValue = type === "checkbox" ? checked : value;
    // updateQuestion(index, { ...question, [name]: fieldValue });
  };

  const submitAnswer = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setResponse(e.target.value);
    updateAnswer(question._id, response);
    // const { name, value, type, checked } = e.target;
    // const fieldValue = type === "checkbox" ? checked : value;
    // updateQuestion(index, { ...question, [name]: fieldValue });
  };

  console.log(question.label, label);

  const handleOptionChange = (optionIndex: number, value: string) => {
    // const updatedOptions = question.options.map((opt: string, idx: number) =>
    //   idx === optionIndex ? value : opt
    // );
    // updateQuestion(index, { ...question, options: updatedOptions });
  };

  const addOption = () => {
    // const updatedOptions = [...question.options, ""];
    // updateQuestion(index, { ...question, options: updatedOptions });
  };

  const removeOption = (optionIndex: number) => {
    // const updatedOptions = question.options.filter(
    //   (_: string, idx: number) => idx !== optionIndex
    // );
    // updateQuestion(index, { ...question, options: updatedOptions });
  };

  return (
    <div className='border p-4 rounded bg-white '>
      <div className='flex justify-between items-center'>
        {disabled && (
          <Button
            type='button'
            size={"icon"}
            variant={"ghost"}
            onClick={() => removeQuestion(question._id)}
            className='ml-auto'
          >
            <Trash2 className='size-5' />
          </Button>
        )}
      </div>
      <div className='mt-2'>
        {/* <select
          name="fieldType"
          value={question.fieldType}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
        >
          <option value="TEXT">Text</option>
          <option value="MULTIPLE_CHOICE">Multiple Choice</option>
          <option value="CHECKBOX">Checkboxes</option>
          <option value="DROPDOWN">Dropdown</option>
          <option value="DATE">Date</option>
          <option value="FILE_UPLOAD">File Upload</option>
        </select> */}
      </div>

      <div className='space-y-4'>
        {disabled ? (
          <p className='px-3'>{label}</p>
        ) : (
          <Input
            type='text'
            name='label'
            value={label}
            disabled={disabled}
            onChange={handleChange}
            required
            placeholder={"Question"}
          />
        )}
        <Input
          type='text'
          name='label'
          value={response}
          onChange={submitAnswer}
          required
          placeholder={"Short answer"}
          className='ring-0 outline-none  shadow-none border-x-0 border-t-0 rounded-none  
          focus-visible:ring-0
          focus-visible:border-purple-500
          transition-colors
          border-b-2'
          disabled={!disabled}
        />
      </div>
      {/* Placeholder Field */}

      {/* Required Checkbox */}
      {/* <div className='mt-2 flex items-center'>
        <Input
          type='checkbox'
          name='required'
          checked={question.required}
          onChange={handleChange}
          className='h-4 w-4 text-blue-600 border-gray-300 rounded'
        />
        <Label className='ml-2 block text-sm text-gray-900'>Required</Label>
      </div> */}
    </div>
  );
};

export default QuestionField;

QuestionField.Skeleton = function QuestionFieldSkeleton() {
  return (
    <div className='border p-4 rounded bg-white '>
      <div className='flex justify-between items-center'>
        <Skeleton className='h-8 w-20' />
      </div>
    </div>
  );
};


<main className='h-full max-w-full'>
        <div className='h-full flex flex-col '>
          <Navbar.Skeleton />
          <main className='bg-purple-50 w-full h-full px-6 lg:px-0'>
            <FormHeader.Skeleton />
            {/* <QuestionField.Skeleton /> */}
          </main>
        </div>
      </main>

<div className='h-full max-w-full'>
<div className='h-full flex flex-col '>
  <Navbar initialData={form} />
  <div className='bg-purple-50 w-full h-full px-6 lg:px-0'>
    <FormHeader initialData={form} editable={true} />
    <div className='max-w-5xl w-full  mx-auto flex flex-col py-4 space-y-3'>
      <div>
          <FormBuilder disabled={isEditable}  questions={formFields} />
      </div>
    </div>
  </div>
</div>
</div>