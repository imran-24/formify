"use client";

import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { Authenticated, AuthLoading, ConvexReactClient } from "convex/react";
import { Loading } from "@/components/auth/loading";

interface ConvexClientProviderProps {
  children: React.ReactNode;
}

const convexURL = process.env.NEXT_PUBLIC_CONVEX_URL;
const convex = new ConvexReactClient(convexURL!);
const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export const ConvexClientProvider = ({
  children,
}: ConvexClientProviderProps) => {
  return (
    <ClerkProvider publishableKey={publishableKey!}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <Authenticated>
            {children}
          </Authenticated>
          <AuthLoading>
          <Loading/>
          </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
