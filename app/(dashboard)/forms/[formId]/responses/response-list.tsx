"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Doc, Id } from "@/convex/_generated/dataModel";
import Link from "next/link";

interface ResponseListProps {
  list: Doc<"responses">[];
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  formId: Id<"forms">;
}

const ResponseList = ({
  list,
  align,
  side,
  sideOffset,
  formId,
}: ResponseListProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"outline"}>
          Expand
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onClick={(e) => e.stopPropagation()}
        className='w-52 lg:w-40 text-sm'
        side={side}
        align={align}
        sideOffset={sideOffset}
      >
        <DropdownMenuLabel>All responses</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {list.map((response, index) => (
          <DropdownMenuItem key={index}>
            <Link href={`/forms/${formId}/response/${response._id}`}>
              Response {index + 1}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ResponseList;
