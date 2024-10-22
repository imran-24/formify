"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { cn, questionType } from "@/lib/utils";
import { useMutation } from "convex/react";
import { Copy, MoreHorizontal, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { QuestionType } from "./type";
import TextareaAutosize from "react-textarea-autosize";

interface FormFieldProps {
  index: number;
  question: any;
  answer?: any;
  responseId?: Id<"responses">;
  updateAnswer: (formFieldId: Id<"formFields">, answer: string) => void;
  updateQuestion: (
    id: Id<"formFields">,
    label?: string,
    required?: boolean,
    type?: string
  ) => void;
  published: boolean;
  removeQuestion: (formId: Id<"formFields">) => void;
  disabled?: boolean;
}

const FormField: React.FC<FormFieldProps> = ({
  index,
  answer,
  question,
  updateQuestion,
  removeQuestion,
  updateAnswer,
  responseId,
  published,
  disabled,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const create = useMutation(api.formField.create);

  const [isEditing, setIsEditing] = useState(false);
  const [type, setType] = useState(question.type);
  const [label, setLabel] = useState(question.label || "Question");
  const [required, setRequired] = useState(question.required);
  const [response, setResponse] = useState(answer?.answer || "");

  let SHORTANSWER = questionType[0].value === question.type;
  let PARAGRAPH = questionType[1].value === question.type;
  let CHECKBOXES = questionType[2];
  let MULTIPLE_CHOICE = questionType[3];
  let FILE_UPLOAD = questionType[4];

  const enableInput = () => {
    if (published) return disableInput();

    setLabel(question.label);
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    }, 0);
  };

  const disableInput = () => {
    setIsEditing(false);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(event.target.value);
    updateQuestion(question._id, label);
  };

  const onCopy = () => {
    create({
      formId: question.formId,
      label,
      required,
      type: question.type,
      order: question.order + 1,
    });
  };

  const onCheck = (checked: boolean) => {
    setRequired(checked);
    // console.log("required:", checked, required);
    updateQuestion(question._id, undefined, checked);
  };

  const onChangeQuestionType = (type: string) => {
    setType(type);
    // console.log("required:", checked, required);
    updateQuestion(question._id, undefined, undefined,  type);
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      disableInput();
    }
  };

  // const handleChange = (
  //   e: React.ChangeEvent<
  //     HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  //   >
  // ) => {
  //   setLabel(e.target.value);
  //   updateQuestion(question._id, label);
  //   // const { name, value, type, checked } = e.target;
  //   // const fieldValue = type === "checkbox" ? checked : value;
  //   // updateQuestion(index, { ...question, [name]: fieldValue });
  // };

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

  console.log(type);

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
    <div className='group relative border p-4 rounded-lg bg-white '>
      <div className='mb-4'>
        <div className='flex justify-end w-full'>
          {!published && (
            <QuestionType
              type={type}
              onSelectType={onChangeQuestionType}
            />
          )}
        </div>
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
        {published ? (
          <div className='px-2'>
            <Button
              type='button'
              variant='secondary'
              size={"sm"}
              className={cn("font-normal h-auto p-1")}
            >
              <span className={cn("line-clamp-3 text-base")}>{label}</span>
            </Button>
          </div>
        ) : (
          <>
            {isEditing ? (
              <Input
                ref={inputRef}
                type='text'
                name='label'
                value={label}
                disabled={published}
                onChange={onChange}
                onBlur={disableInput}
                onKeyDown={onKeyDown}
                required
                placeholder={"Question"}
              />
            ) : (
              <div className='px-2'>
                <Button
                  onClick={enableInput}
                  variant='secondary'
                  size={"sm"}
                  className={cn("font-normal h-auto p-1")}
                >
                  <span className={cn("truncate text-base")}>{label || 'Question'}</span>
                </Button>
              </div>
            )}
          </>
        )}
        {SHORTANSWER && (
          <Input
            type='text'
            name='label'
            value={response}
            onChange={submitAnswer}
            required={required}
            placeholder={"Short answer"}
            className='ring-0 outline-none w-1/2  shadow-none border-x-0 border-t-0 rounded-none  
            focus-visible:ring-0
            focus-visible:border-purple-500
            transition-colors
            border-b-2'
            disabled={!published}
          />
        )}
        {PARAGRAPH && (
          <TextareaAutosize
            className='w-full bg-transparent  ring-0 outline-none shadow-none border-x-0 border-t-0 rounded-none  
            focus-visible:ring-0
            focus-visible:border-purple-500
            transition-colors
            resize-none
            px-3
            py-2
            text-sm
            disabled:cursor-not-allowed
            placeholder:text-sm placeholder:text-neutral-300   placeholder:font-normal
            border-b-2 '
            
            value={response}
            onChange={submitAnswer}
            required={required}
            placeholder={"Paragraph"}
            disabled={!published}
          />
        )}
      </div>
      {!published && (
        <div className='opacity-0 group-hover:opacity-100 transition-opacity'>
          <div className='flex items-center justify-end space-x-3'>
            <Button
              type='button'
              size={"icon"}
              variant={"ghost"}
              disabled={disabled}
              onClick={onCopy}
              className='ml-auto'
            >
              <Copy className='size-5 text-neutral-700' />
            </Button>
            <Button
              type='button'
              size={"icon"}
              variant={"ghost"}
              disabled={disabled}
              onClick={() => removeQuestion(question._id)}
              className='ml-auto'
            >
              <Trash2 className='size-5 text-neutral-700' />
            </Button>
            <div className='flex items-center space-x-2'>
              <Switch
                checked={required}
                onCheckedChange={onCheck}
                id='airplane-mode'
              />
              <Label htmlFor='airplane-mode'>Required</Label>
            </div>
          </div>
        </div>
      )}
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

export default FormField;

// FormField.Skeleton = function FormHeaderSkeleton() {
//     return (
//       <div className='max-w-5xl w-full mx-auto flex flex-col space-y-2 bg-white rounded-lg p-6 mt-4 border shadow'>
//         <Skeleton className='flex items-center gap-x-1 h-14 w-48'></Skeleton>
//         <Skeleton className='flex items-center gap-x-1 h-10 w-full'></Skeleton>
//       </div>
//     )
//   }
