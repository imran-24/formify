"use client";

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface FooterProps{
    disabled: boolean;
    isFavorite: boolean;
    authorLabel: string;
    createdAtLabel: string;
    title: string;
    onClick: () => void;
}
const Footer = ({authorLabel, createdAtLabel, disabled, isFavorite, onClick, title}: FooterProps) => {
  
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    event.preventDefault();
    onClick();
  }
  return (
    <div className="bg-white relative p-3">
        <p className="text-[13px] truncate max-w-[calc(100% - 20px)]">{title}</p>
        <div className="group-hover:opacity-100 opacity-0 transform transition-opacity">
            <p className="text-[11px] text-muted-foreground">{authorLabel}, {createdAtLabel}</p>
        </div>
        <button 
        onClick={handleClick}
        className={cn(`opacity-0 group-hover:opacity-100 transition-opacity absolute right-3 top-3 hover:text-blue-600`,
            disabled && "cursor-not-allowed opacity-75"
        )}>            <Star className={cn('size-4 text-muted-foreground', isFavorite && "fill-blue-600 text-blue-600")} />
        </button>
    </div>
  )
}

export default Footer