"use client";

import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import SearchInput from "./search-input";
import Togglebar from "./togglebar";


// const font = Poppins({
//     subsets: ["latin"],
//     weight: ["600"],
//   });

const Navbar = () => {
  return (
    <div className=" w-full mx-auto flex items-center gap-x-6 p-2 px-6">
        <Togglebar />
        <Link href={"/"}>
            <div className="flex items-center gap-x-2">
                <Image src="/logo.svg" width={28} height={28} alt="logo" />
                <span className={"text-xl"}>Forms</span>
            </div>
        </Link>
        <div className="flex-1">
            <SearchInput />
        </div>
        <div>
            <UserButton />
        </div>

    </div>
  )
}

export default Navbar