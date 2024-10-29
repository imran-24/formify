"use client";

import { Loading } from "@/components/auth/loading";
import { useAdmin } from "@/hooks/use-admin";
import { CustomError, errorList } from "@/lib/utils";
import { useAuth, useOrganizationList } from "@clerk/nextjs";
import { useEffect } from "react";

interface DashboardLayout {
  children: React.ReactNode;
}

const DashboradLayout = ({ children }: DashboardLayout) => {
  const { userId, orgRole, orgId } = useAuth();
  const { setAdmin } = useAdmin();
  const { isLoaded, setActive } = useOrganizationList({
    userMemberships: {
      pageSize: 5,
      keepPreviousData: true,
    },
  });

  if (!isLoaded) {
    return <Loading />;
  }

  if (!userId) throw new CustomError(errorList["unauthorized"]);

  console.log(orgRole);
  useEffect(() => {
    if (isLoaded) {
    
      const isAdmin = orgRole === "org:admin";
      if(isAdmin){
        setActive({ organization: orgId });
        setAdmin(userId);
      }
    }
  }, [isLoaded]);

  // useEffect(() => {
  //   if (isLoaded && userMemberships.data.length) {
  //     // Check if there is an organization with the "org:admin" role
  //     const adminMembership = userMemberships.data.find(
  //       (membership: any) => membership?.role === "org:admin"
  //     );

  //     if (adminMembership) {
  //       console.log("Admin found");

  //       // Set the active organization if the user is an admin
  //       setActive({ organization: adminMembership.organization.id });
  //       setAdmin(userId);
  //     } else {
  //       console.log("Not an admin");
  //       setActive({ organization: "" });

  //       // Optionally redirect or handle non-admin users here
  //     }
  //   }
  // }, [isLoaded, userMemberships.data]);

  return (
    <main className='h-full'>
      <div className='h-full flex flex-col'>{children}</div>
    </main>
  );
};

export default DashboradLayout;
