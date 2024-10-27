import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className='flex  items-center justify-center space-y-2'>
      <h1 className='font-black text-gray-200 text-9xl mb-2'>404</h1>

      <p className='text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
        Unauthroized!
      </p>

      <p className=' text-gray-500'>You are not authorized</p>

      <Button
        variant={"ghost"}
        size={"lg"}
        type='button'
        className='mt-6'
      >
        <Link href={"/"}>Return home</Link>
      </Button>
    </div>
  );
}
