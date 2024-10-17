"use client";

import Image from "next/image";


const EmptySearch = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
        <Image src={"/empty-search.svg"} height={200} width={200} alt="Empty" />
        <h2 className="text-2xl font-semibold">No result found</h2>
        <p className="text-muted-foreground text-sm mt-2">Try searching something else</p> 
    </div>
  )
}

export default EmptySearch
