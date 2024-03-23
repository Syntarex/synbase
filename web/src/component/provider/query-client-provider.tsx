"use client";

import { getQueryClient } from "@/util/client/query-client";
import { QueryClientProvider as TanstackQueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

interface QueryClientProviderProps {
    children: ReactNode;
}

export const QueryClientProvider = ({ children }: QueryClientProviderProps) => {
    const queryClient = getQueryClient();

    return <TanstackQueryClientProvider client={queryClient}>{children}</TanstackQueryClientProvider>;
};
