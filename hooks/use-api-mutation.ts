import { useMutation } from "convex/react";
import { useState } from "react"



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useApiMutation = (mutationFunc: any) => {
    const [pending, setpending] = useState(false);
    const apiMutation = useMutation(mutationFunc);

    const mutate = (payload: unknown) => {
        setpending(true);
        return apiMutation(payload)
        .finally(()=> setpending(false))
        .then((result) => result)
        .catch((error) => {
            throw error;
        })
    }
    return {mutate, pending};
}