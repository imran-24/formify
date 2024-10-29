"use client";

import { useAuth, useOrganizationList } from "@clerk/nextjs";
import FormList from "./_components/form-list";
import Navbar from "./_components/navbar";
import { useEffect } from "react";
import { Loading } from "@/components/auth/loading";
import { useAdmin } from "@/hooks/use-admin";
import { CustomError, errorList } from "@/lib/utils";

interface DashboardPageProps {
  searchParams: {
    search?: string;
    favorites?: string;
  };
}

export default function DashboardPage({ searchParams }: DashboardPageProps) {
  const { userId } = useAuth();
  

  return (
    <div className='flex flex-col p-6 flex-1 h-full'>
      <Navbar />
      <FormList
        // query={searchParams}
        authId={userId!}
      />
    </div>
  );
}
