"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { AlignJustify, LayoutDashboard, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const Togglebar = () => {
  const searchParams = useSearchParams();
  const favorites = searchParams.get("favorites");

  return (
    <Sheet>
      <SheetTrigger>
        <button>
          <AlignJustify className='text-primary mt-2 size-6' />
        </button>
      </SheetTrigger>
      <SheetContent side={"left"}>
        <SheetHeader>
          <Link href={"/"}>
            <div className='flex items-center gap-x-2'>
              <Image src='/logo.svg' width={30} height={30} alt='logo' />
              <span className={"text-2xl"}>Forms</span>
            </div>
          </Link>
        </SheetHeader>
        <div className='mt-4 space-y-1'>
          <Button
            asChild
            size={"lg"}
            variant={favorites ? "ghost" : "secondary"}
            className='font-normal justify-start px-2 w-full text-base'
          >
            <Link href={"/"}>
              <LayoutDashboard className='size-5 mr-2' />
              My forms
            </Link>
          </Button>
          <Button
            asChild
            size={"lg"}
            variant={favorites ? "secondary" : "ghost"}
            className='font-normal justify-start px-2 w-full text-base'
          >
            <Link
              href={{
                pathname: "/",
                query: { favorites: true },
              }}
            >
              <Star className='size-5 mr-2' />
              Favorite forms
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Togglebar;
