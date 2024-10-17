"use client";

import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import Header from "./_components/header";

interface DashboardLayout {
  children: React.ReactNode;
  params: {
    formId: Id<"forms">;
  };
}

const FormEditLayout = ({ children, params }: DashboardLayout) => {
  const form = useQuery(api.form.getById, {
    formId: params.formId
  });

  if(form === undefined) {
    return (
      <div>Loading</div>
    )
  }

  if(!form) return null;

  return (
    <main className='h-full max-w-full'>
      <div className='h-full flex flex-col '>
        <Header form={form}  />
        {/* {JSON.stringify(form)} */}
        <main className="bg-purple-50 w-full h-full px-6 lg:px-0">
        {children}
        </main>
      </div>
    </main>
  );
};

export default FormEditLayout;
