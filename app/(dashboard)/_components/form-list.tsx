"use client";

import { useQuery } from "convex/react";
import EmptyFavorites from "./empty-favorites";
import EmptyForm from "./empty-form";
import EmptySearch from "./empty-search";
import { api } from "@/convex/_generated/api";
import FormCard from "./formcard";
import NewFormButton from "./formcard/new-form-button";
import { useSearchParams } from "next/navigation";

interface FormListProps {
  authId: string;
  // query: {
  //   search?: string;
  //   favorites?: string;
  // };
}

const FormList = ({ authId }: FormListProps) => {
  const searchParams = useSearchParams();
  let favorites = searchParams.get("favorites")?.trim();
  let search = searchParams.get("search")?.trim();

  const data = useQuery(api.forms.get, { authorId: authId, search: search, favorites: favorites });

  // const data: any[] = []

  if (data === undefined) {
    return (
      <div className='relative max-w-[1200px] mx-auto w-full'>
        <h2 className='text-2xl'>
          {favorites ? "Favorite forms" : "My forms"}
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10 '>
          <NewFormButton />
          <FormCard.Skeleton />
          <FormCard.Skeleton />
          <FormCard.Skeleton />
          <FormCard.Skeleton />
          <FormCard.Skeleton />
        </div>
      </div>
    );
  }

  console.log(data.length, favorites, search);

  if (!data.length && favorites) {
    return <EmptyFavorites />;
  }

  if (!data.length && search) {
    return <EmptySearch />;
  }

  if (!data.length) {
    return <EmptyForm />;
  }

  return (
    <div className='relative max-w-[1200px] mx-auto w-full'>
      <h2 className='text-2xl'>
        {favorites ? "Favorite forms" : "My forms"}
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10 '>
        <NewFormButton />
        {data.map((form) => (
          <FormCard
            key={form._id}
            id={form._id}
            title={form.title}
            authorName={form.authorName}
            authorId={form.authorId}
            createdAt={form._creationTime}
            imageUrl={form.imageUrl}
            isFavorite={form.isFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default FormList;
