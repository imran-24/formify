"use client";

import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import Overlay from "./overlay";
import Footer from "./footer";
import { Skeleton } from "@/components/ui/skeleton";
import Actions from "../actions";
import { Button } from "@/components/ui/button";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { MoreHorizontal } from "lucide-react";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface FormCardProps {
  id: string;
  title: string;
  authorName: string;
  authorId: string;
  imageUrl: string;
  createdAt: number;
  isFavorite: boolean;
}

const FormCard = ({
  authorId,
  authorName,
  createdAt,
  id,
  imageUrl,
  title,
  isFavorite,
}: FormCardProps) => {
    const {mutate: onFavorite,
      pending: pendingFavorite
    } = useApiMutation(api.form.favorite);

    const {mutate: onUnfavorite,
      pending: pendingUfavorite
    } = useApiMutation(api.form.unfavorite);

    const {userId} = useAuth();
    const authorLabel = userId === authorId ? "You" : authorName;
    const createAtLabel = formatDistanceToNow(createdAt,{
        addSuffix: true,
    });

    const toggleFavorite = () => {
      if(!isFavorite){
        onFavorite({
          id
        }).catch(() => toast.error("Failed to unfavorite"));
      }else{
        onUnfavorite({id}).catch(() => toast.error("Failed to favorite"))
      }
    }
  return (
    <Link href={`/forms/${id}/edit`}>
      <div className='group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden bg-white'>
        <div className='relative flex-1'>
          <Image src={imageUrl} fill alt='image' />
          <Overlay />
          <Actions
          id={id}
          title={title}
          side="right">
            <button 
            className="absolute top-3 right-3 border-none outline-none opacity-0 group-hover:opacity-100 transition-opacity">
              <MoreHorizontal className="size-6 text-white opacity-75 hover:opacity-100 transition-opacity" />
            </button>
          </Actions>
        </div>
        <Footer 
        authorLabel={authorLabel}
        createdAtLabel={createAtLabel}
        isFavorite={isFavorite}
        disabled={pendingFavorite || pendingUfavorite}
        title={title}
        onClick={toggleFavorite}
        />
      </div>
    </Link>
  );
};

FormCard.Skeleton = function FormCardSkeleton(){
    return(
        <div className="aspect-[100/127] rounded-lg overflow-hidden">
            <Skeleton className="w-full h-full" />
        </div>
    )
}

export default FormCard;
