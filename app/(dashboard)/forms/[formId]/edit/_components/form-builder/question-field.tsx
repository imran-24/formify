// components/QuestionField.tsx

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Id } from "@/convex/_generated/dataModel";
import { Plus, Trash2 } from "lucide-react";
import React, { useState } from "react";

interface QuestionFieldProps {
  index: number;
  question: any;
  updateQuestion: (index: number, field: any) => void;
  removeQuestion: (formId: Id<"formFields">) => void;
}

const QuestionField: React.FC<QuestionFieldProps> = ({
  index,
  question,
  updateQuestion,
  removeQuestion,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    // const { name, value, type, checked } = e.target;
    // const fieldValue = type === "checkbox" ? checked : value;
    // updateQuestion(index, { ...question, [name]: fieldValue });
  };

  console.log(question);

  const handleOptionChange = (
    optionIndex: number,
    value: string
  ) => {
    const updatedOptions = question.options.map((opt: string, idx: number) =>
      idx === optionIndex ? value : opt
    );
    updateQuestion(index, { ...question, options: updatedOptions });
  };

  const addOption = () => {
    const updatedOptions = [...question.options, ""];
    updateQuestion(index, { ...question, options: updatedOptions });
  };

  const removeOption = (optionIndex: number) => {
    // const updatedOptions = question.options.filter(
    //   (_: string, idx: number) => idx !== optionIndex
    // );
    // updateQuestion(index, { ...question, options: updatedOptions });

  };

  return (
    <div className="border p-4 rounded mb-4 bg-white">
      <div className="flex justify-between items-center">
        {index > 0 && (
          <Button
            type="button"
            size={"icon"}
            variant={"ghost"}
            onClick={() => removeQuestion(question._id)}
            className="ml-auto"
          >
            <Trash2 className="size-5" /> 
          </Button>
        )}
      </div>
      <div className="mt-2">
        
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
      <div className="mt-2 space-y-4">
        {/* <label className="block text-sm font-medium text-gray-700">
          Question
        </label> */}
        <Input
          type="text"
          name="label"
          value={question.label}
          onChange={handleChange}
          required
          placeholder={"Question"}
        />
         <Input
          type="text"
          name="label"
          value={question.label}
          onChange={handleChange}
          required
          placeholder={"Short answer"}
          className="ring-0 outline-none  shadow-none border-x-0 border-t-0 rounded-none  border-b-2"
          disabled={true}
        />
      </div>
      {/* Placeholder Field */}
      
      {/* Required Checkbox */}
      <div className="mt-2 flex items-center">
        <Input
          type="checkbox"
          name="required"
          checked={question.required}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 border-gray-300 rounded"
        />
        <Label className="ml-2 block text-sm text-gray-900">Required</Label>
      </div>
    </div>
  );
};

export default QuestionField;
