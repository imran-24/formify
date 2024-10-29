"use client";

import Image from "next/image";
import Link from "next/link";
import { OrganizationList, UserButton } from "@clerk/nextjs";
import SearchInput from "./search-input";
import Togglebar from "./togglebar";
import { Badge } from "@/components/ui/badge";
import { useAdmin } from "@/hooks/use-admin";

// const font = Poppins({
//     subsets: ["latin"],
//     weight: ["600"],
//   });

const Navbar = () => {
  const { isAdmin } = useAdmin();
  return (
    <div className=' w-full mx-auto flex items-center justify-between gap-x-6 mb-4'>
      <div className='flex items-center space-x-6'>
        <Togglebar />
        <Link href={"/"}>
          <div className='flex items-center gap-x-2'>
            <Image src='/logo.svg' width={28} height={28} alt='logo' />
            <span className={"text-xl"}>Forms</span>
          </div>
        </Link>
      </div>
      {/* <OrganizationList /> */}
      <div className='hidden md:flex flex-1'>
        <SearchInput />
      </div>

      <div className='flex items-center space-x-3'>
        {isAdmin && <Badge variant={"destructive"}>Admin</Badge>}
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
