import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className='grid h-screen px-4 bg-white place-content-center'>
      <div className='flex flex-col items-center justify-center space-y-2'>
        <h1 className='font-black text-gray-200 text-9xl mb-2'>404</h1>
        <p className='text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
          Page not found!
        </p>
        <p className=' text-gray-500'>Page doesn't exist</p>
        <Button variant={"ghost"} size={"lg"} type='button' className='mt-6' asChild>
          <Link href={"/"}>Return home</Link>
        </Button>
      </div>
    </div>
  );
}
