'use client';

import Image from "next/image";

const EmptyFavorites = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
        <Image alt="Empty" height={200} width={200} src={"/empty-favorites.svg"} />
        <h2 className="text-2xl font-semibold mt-6">No favorite form</h2>
        <p className="text-muted-foreground text-sm mt-2">Try favoriting a form</p>
    </div>
  )
}

export default EmptyFavorites