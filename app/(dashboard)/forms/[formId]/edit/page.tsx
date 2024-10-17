"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import React, { useEffect, useRef, useState } from "react";
import FormBuilder from "./_components/form-builder";
import FormHeader from "./_components/form-builder/form-header";
import { Button } from "@/components/ui/button";

interface FormEditPageProps {
  params: {
    formId: Id<"forms">;
  };
}

const FormEditPage = ({ params }: FormEditPageProps) => {
  const form = useQuery(api.form.getById, {
    formId: params.formId,
  });

  const formFields = useQuery(api.formFields.get,{
    formId: params.formId
  });

  const inputTitleRef = useRef<HTMLInputElement>(null);
  const inputDescriptionRef = useRef<HTMLInputElement>(null);

  const update = useMutation(api.form.update);

  const [title, setTitle] = useState(form?.title || "Untitled");
  const [description, setDescription] = useState(form?.description || "");

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDescription, setIsEditingDescription] = useState(false);

  if (!form) return null;

  const enableInputTitle = () => {
    setTitle(form.title);
    setIsEditingTitle(true);
    setTimeout(() => {
      inputTitleRef.current?.focus();
      inputTitleRef.current?.setSelectionRange(
        0,
        inputTitleRef.current.value.length
      );
    }, 0);
  };

  const enableInputDescription = () => {
    setDescription(description);
    setIsEditingDescription(true);
    setTimeout(() => {
      inputDescriptionRef.current?.focus();
      inputDescriptionRef.current?.setSelectionRange(
        0,
        inputDescriptionRef.current.value.length
      );
    }, 0);
  };

  const disableInput = () => {
    setIsEditingTitle(false);
    setIsEditingDescription(false);
  };

  const onChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    update({
      id: form._id,
      title: event.target.value || "Untitled",
    });
  };

  const onChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
    update({
      id: form._id,
      title: title,
      descrition: event.target.value,
    });
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      disableInput();
    }
  };

  const [isPublic, setIsPublic] = useState(false);
  const [questions, setQuestions] = useState(formFields || []);

  useEffect(() => {
    setQuestions(formFields || []);
  },[formFields])

  if (document === undefined) {
    return <div>Loading</div>;
  }

  return (
    <div className='max-w-5xl w-full  mx-auto flex flex-col py-4 space-y-3'>
      <div>
        <form onSubmit={() => {}}>
          <div className='mb-4 bg-white p-6 rounded-lg shadow border'>
            <FormHeader
              disableInput={disableInput}
              enableInputTitle={enableInputTitle}
              inputTitleRef={inputTitleRef}
              isEditingTitle={isEditingTitle}
              onChangeTitle={onChangeTitle}
              onChangeDescription={onChangeDescription}
              inputDescriptionRef={inputDescriptionRef}
              description={description}
              enableInputDescription={enableInputDescription}
              isEditingDescription={isEditingDescription}
              onKeyDown={onKeyDown}
              title={title}
            />
          </div>
          {/* <div className='mb-4 flex items-center'>
            <input
              type='checkbox'
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className='h-4 w-4 text-blue-600 border-gray-300 rounded'
            />
            <label className='ml-2 block text-sm text-gray-900'>
              Make this form public
            </label>
          </div> */}
          {/* <hr className='my-4' /> */}
          {/* {JSON.stringify(formFields)} */}
          <FormBuilder questions={questions} formId={params.formId}  />
          {/* <Button
            type='submit'
          >
            Create Form
          </Button> */}
        </form>
      </div>
    </div>
  );
};

export default FormEditPage;
