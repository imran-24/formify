"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const FormSubmission = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full'>
<Image alt='Empty' height={400} width={400} src={"/success.svg"} />
      <h2 className='text-2xl font-semibold mt-6'>Welcome Back</h2>
      <p className='text-sm mt-2 text-muted-foreground'>
        Thank you for your response
      </p>
      <div className='mt-4'>
        <Button size={"lg"} asChild type="button">
          <Link href={"/"}>
          Go back
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default FormSubmission;
