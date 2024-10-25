"use client";

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import React from "react";
import Title from "./title";
import { Publish } from "./publish";
import { Menu } from "@/app/(dashboard)/_components/menu";
import Logo from "@/components/logo";
import { Skeleton } from "@/components/ui/skeleton";

interface NavbarProps{
    initialData: Doc<"forms">;
    published: boolean; 
}

const Navbar = ({initialData, published}: NavbarProps) => {
//   const params = useParams();

//   const document = useQuery(api.form.getById, {
//     formId: params.formId as Id<"forms">,
//   });

//   if (document === undefined) {
//     return (
//       <div>Loading</div>
//       //   <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center justify-between">
//       //     <Title.Skeleton />
//       //     <div className="flex items-center gap-x-2">
//       //       <Menu.Skeleton />
//       //     </div>
//       //   </nav>
//     );
//   }

//   if(document == null) return (
//     <div>Not Found</div>
//   )

  return (
    <>
      <nav className='bg-background dark:bg-[#1F1F1F] p-3 px-5 w-full flex items-center gap-x-4'>
        <div className='flex items-center justify-between w-full'>
          <div className="flex items-center">
            <Logo />
            <Title published={published}  initialData={initialData} />
          </div>
          <div className='flex items-center gap-x-2'>
            <Publish initialData={initialData} />
            <Menu formId={initialData._id} />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

Navbar.Skeleton = function NavbarSkeleton() {
  return (
    <nav className='bg-background dark:bg-[#1F1F1F] p-3 w-full flex items-center gap-x-4'>
      <div className='flex items-center justify-between w-full'>
          <div className="flex items-center space-x-6">
            <Logo />
            <Title.Skeleton />
          </div>
          <div className='flex items-center gap-x-2'>
            <Skeleton className="w-20 h-8" />
            <Skeleton className="w-8 h-8" />
          </div>
        </div>
    </nav>
  )
}