"use client";

import { Doc } from "@/convex/_generated/dataModel";
import React from "react";

interface FormSubmissionProps {
  children: React.ReactNode;
}
const FormSubmission = ({
  children,
}: FormSubmissionProps) => {
  return (
    <div className='max-w-xl w-full mx-auto flex flex-col space-y-2 bg-purple-100 rounded-lg p-6 mt-4 border shadow'>
      {children}
      <p className="">Form Has been submitted.</p>
    </div>
  );
};

export default FormSubmission;
