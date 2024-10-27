"use client";

import { Button } from "@/components/ui/button";

type ErrorProps = {
  error: {
    message: string;
    status: number;
    description: string;
  };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className='grid h-screen px-4 bg-white place-content-center'>
      <div className='text-center'>
        <h1 className='font-black text-gray-200 text-9xl mb-2'>
          {error.status}
        </h1>
        <p className='text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
          {error.message}
        </p>
        <p className='text-gray-500'>{error.description}</p>
        <Button
          type='button'
          size={"lg"}
          onClick={reset}
          className='mt-6'
        >
          Try Again
        </Button>
      </div>
    </div>
  );
}
