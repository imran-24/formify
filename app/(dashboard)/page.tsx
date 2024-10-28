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
  const { userId, has } = useAuth();

  if (!has) return null

  const isAdmin = has({ role: 'org:admin' })

  console.log(isAdmin);

  return (
    <div className='flex flex-col p-6 flex-1 h-full'>
      <Navbar />
      <FormList 
      // query={searchParams} 
      authId={userId!} />
    </div>
  );
}
