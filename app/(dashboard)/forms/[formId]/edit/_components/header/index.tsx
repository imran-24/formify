"use client";

import Logo from "@/components/logo";
import Title from "./title";
import { Doc } from "@/convex/_generated/dataModel";
import ActionButton from "./action-button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
  form: Doc<"forms">;
}

const Header = ({ form }: HeaderProps) => {
  const pathname = usePathname();

  return (
    <div className='relative w-full mx-auto py-3  border shadow pb-10'>
      <div className="flex items-center justify-between gap-x-6 px-6">
        <div className='flex items-center space-x-6'>
        <Logo />
        <Title initialData={form} />
      </div>
      <div>
        <ActionButton />
      </div>
      </div>
      
      <ul className='absolute bottom-0 flex items-center justify-center w-full space-x-3 text-sm '>
        <Link href={pathname}>
          <p className='p-1 text-purple-800'>Questions</p>
          <div className='w-full h-[3px] rounded-t-full  bg-purple-800' />
        </Link>
        <Link href={"#response"}>
          <p className='p-1'>Response</p>
        </Link>
        <Link href={"#settings"}>
          <p className='p-1'>Settings</p>
        </Link>
      </ul>
    </div>
  );
};

export default Header;
