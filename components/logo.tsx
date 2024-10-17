"use client";

import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"}>
      <div className='flex items-center gap-x-2'>
        <Image src='/logo.svg' width={28} height={28} alt='logo' />
      </div>
    </Link>
  );
};

export default Logo;
