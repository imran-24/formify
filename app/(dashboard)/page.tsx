"use client";

import { useAuth } from "@clerk/nextjs";
import FormList from "./_components/form-list";
import Navbar from "./_components/navbar";

interface DashboardPageProps {
  searchParams: {
    search?: string;
    favorites?: string;
  };
}

export default function DashboardPage({ searchParams }: DashboardPageProps) {
  const { userId } = useAuth();

  return (
    <div className='flex flex-col bg-neutral-100 p-6 flex-1 min-h-full'>
      <Navbar />
      <FormList query={searchParams} authId={userId!} />
    </div>
  );
}