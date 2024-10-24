"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { cn, questionType } from "@/lib/utils";
import { useMutation, useQuery } from "convex/react";
import { Copy, ImageUp, PlusCircle, Trash2, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { QuestionType } from "./type";
import TextareaAutosize from "react-textarea-autosize";
import { useEdgeStore } from "@/lib/edgestore";
import { useFormImage } from "@/hooks/use-form-image";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
  // options?: Doc<"options">[] | undefined;
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
  // options,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const create = useMutation(api.formField.create);
  const update = useMutation(api.formField.update);
  const createOption = useMutation(api.option.create);
  const removeImage = useMutation(api.formField.removeImage);
  const updateOption = useMutation(api.option.update);
  const removeOption = useMutation(api.option.remove);
  const removeManyOption = useMutation(api.option.removeMany);

  let options = useQuery(api.options.get, {
    formFieldId: question._id,
  });

  const { edgestore } = useEdgeStore();
  const formImage = useFormImage();

  const [isEditing, setIsEditing] = useState(false);
  const [type, setType] = useState(question.type);
  const [label, setLabel] = useState(question.label || "Question");
  const [items, setItems] = React.useState<Doc<"options">[] | undefined>(
    options
  );
  const [required, setRequired] = useState(question.required);
  const [response, setResponse] = useState(answer?.answer || "");

  const checkBoxes = questionType[2];
  const multipleChoice = questionType[3];

  let SHORTANSWER = questionType[0].value === question.type;
  let PARAGRAPH = questionType[1].value === question.type;
  let CHECKBOXES = checkBoxes.value === question.type;
  let MULTIPLE_CHOICE = multipleChoice.value === question.type;
  let FILE_UPLOAD = questionType[4];

  useEffect(() => {
    // Only update items if the type requires options (e.g., checkboxes or multiple choice)
    if (type === checkBoxes.value || type === multipleChoice.value) {
      setItems(options);
    }
  }, [options?.length, type]);

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
    update({ id: question._id, label });
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

  const onRemoveOption = (id: Id<"options">) => {
    removeOption({
      id,
    });
  };
  const onRemove = async () => {
    if (question.imageUrl) {
      await edgestore.publicFiles.delete({
        url: question.imageUrl,
      });
    }
    removeImage({
      id: question._id as Id<"formFields">,
    });
  };

  const onUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({
      file,
    });
    update({
      id: question._id,
      imageUrl: response.url,
    });
  };

  const onCheck = (checked: boolean) => {
    setRequired(checked);
    // console.log("required:", checked, required);
    update({ id: question._id, required: checked });
  };

  const onChangeQuestionType = async (type: string) => {
    // Update the question type locally
    setType(type);
    setItems([]); // Clear existing items when question type changes

    // Remove all existing options for this question when the type changes
    try {
      await removeManyOption({
        fromFieldId: question._id,
      });
    } catch (error) {
      console.error("Failed to remove options:", error);
    }

    // Update the question type in the database
    try {
      await update({ id: question._id, type: type });
    } catch (error) {
      console.error("Failed to update question type:", error);
    }

    // If the new type requires options (checkbox or multiple choice), add an initial option
    if (checkBoxes.value === type || multipleChoice.value === type) {
      try {
        await createOption({
          formFieldId: question._id as Id<"formFields">,
          optionText: `option ${items?.length ? items.length + 1 : 1}`,
        });
      } catch (error) {
        console.error("Failed to create initial option:", error);
      }
    }
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      disableInput();
    }
  };
  // scale up ads agengy
  //
  // spark tech
  // backbencher studio
  // bbs agengy

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

  const onOpen = () => formImage.onOpen(question._id);

  const onOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: Id<"options">
  ) => {
    setItems(
      items?.map((item) => {
        if (item._id === id) {
          return {
            ...item,
            optionText: event.target.value, // Correctly updating the optionText property
          };
        }
        return item;
      })
    );

    updateOption({
      id,
      optionText: event.target.value,
    });
  };

  const addOption = () => {
    createOption({
      formFieldId: question._id,
      optionText: `option ${items?.length ? items.length + 1 : 1}`,
    });
  };

  return (
    <div className='group relative border p-6 rounded-lg bg-white '>
      <div className='flex justify-end space-x-2 w-full'>
        {!published && (
          <div className='mb-2 flex items-center space-x-1'>
            <Button variant={"ghost"} onClick={onOpen}>
              <ImageUp className='size-5 text-neutral-700' />
            </Button>
            <QuestionType type={type} onSelectType={onChangeQuestionType} />
          </div>
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

      <div className='space-y-4 relative flex flex-col'>
        {published ? (
          <div className=''>
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
              <div className=''>
                <Button
                  onClick={enableInput}
                  variant='secondary'
                  size={"sm"}
                  className={cn("font-normal h-auto p-1")}
                >
                  <span className={cn("truncate text-base")}>
                    {label || "Question"}
                  </span>
                </Button>
              </div>
            )}
          </>
        )}
        {!!question?.imageUrl && (
          <div className='min-h-[30rem] relative w-full'>
            <Image
              src={question?.imageUrl}
              fill
              alt='Question image'
              className='rounded-md border py-4  aspect-square  object-contain'
            />

            {!published && (
              <div className='absolute top-3 right-3'>
                <Button
                  onClick={onRemove}
                  className='text-muted-foreground text-xs'
                  variant='outline'
                  size='sm'
                  disabled={published}
                >
                  <X className='h-4 w-4 mr-2' />
                  Remove
                </Button>
              </div>
            )}
          </div>
        )}
        <div>
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
          {CHECKBOXES && (
            <div className='flex flex-col space-y-4 pl-3 transition-all transform ease-in-out  duration-200'>
              {items?.map((option) => (
                <div className='flex items-center transition-all transform ease-in-out  duration-200'>
                  <>
                    <Checkbox
                      required={required}
                      // checked={field.value?.includes(item.id)}
                      // onCheckedChange={(checked) => {
                      //   return checked
                      //     ? field.onChange([...field.value, item.id])
                      //     : field.onChange(
                      //         field.value?.filter((value) => value !== item.id)
                      //       );
                      // }}
                    />
                    {!published ? (
                      <div className='flex items-center space-x-2 w-full'>
                        <Input
                          type='text'
                          name='Option'
                          value={option.optionText}
                          disabled={published}
                          onChange={(e) => onOptionChange(e, option._id)}
                          required
                          className='ring-0 outline-none w-full  shadow-none border-x-0 border-t-0 rounded-none  
                        focus-visible:ring-0
                        flex-1
                        focus-visible:border-purple-500
                        transition-colors
                        border-b-2'
                          placeholder={"Option"}
                        />
                        <Button
                          onClick={() => onRemoveOption(option._id)}
                          className='text-muted-foreground text-xs'
                          variant='ghost'
                          size='sm'
                        >
                          <X className='h-4 w-4' />
                        </Button>
                      </div>
                    ) : (
                      <div className=''>
                        <label className={cn("truncate text-base pl-2")}>
                          {option.optionText}
                        </label>
                      </div>
                    )}
                  </>
                </div>
              ))}
              {!published && (
                <Button
                  type='button'
                  size={"lg"}
                  variant={"ghost"}
                  disabled={published}
                  onClick={addOption}
                  className='w-fit'
                >
                  <PlusCircle className='size-5 text-neutral-700 mr-3' />
                  add option
                </Button>
              )}
            </div>
          )}

          {MULTIPLE_CHOICE && (
            <div className='flex flex-col space-y-4 transition-all pl-3 transform ease-in-out  duration-200'>
              <RadioGroup required={required}>
                {items?.map((option) => (
                  <div className='flex items-center spa transition-all transform ease-in-out  duration-200'>
                    <>
                      <RadioGroupItem
                        
                        value={option.optionText!}
                        id={option._id}
                      />
                      {!published ? (
                        <div className='flex items-center space-x-2 w-full'>
                          <Input
                            type='text'
                            name='Option'
                            value={option.optionText}
                            disabled={published}
                            onChange={(e) => onOptionChange(e, option._id)}
                            required
                            className='ring-0 outline-none w-full  shadow-none border-x-0 border-t-0 rounded-none  
                        focus-visible:ring-0
                        flex-1
                        focus-visible:border-purple-500
                        transition-colors
                        border-b-2'
                            placeholder={"Option"}
                          />
                          <Button
                            onClick={() => onRemoveOption(option._id)}
                            className='text-muted-foreground text-xs'
                            variant='ghost'
                            size='sm'
                          >
                            <X className='h-4 w-4' />
                          </Button>
                        </div>
                      ) : (
                        <div className=''>
                          <label className={cn("truncate text-base pl-2")}>
                            {option.optionText}
                          </label>
                        </div>
                      )}
                    </>
                  </div>
                ))}
              </RadioGroup>
              {!published && (
                <Button
                  type='button'
                  size={"lg"}
                  variant={"ghost"}
                  disabled={published}
                  onClick={addOption}
                  className='w-fit'
                >
                  <PlusCircle className='size-5 text-neutral-700 mr-3' />
                  add option
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
      {!published && (
        <div className='opacity-0 group-hover:opacity-100 transition-opacity mt-4'>
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
