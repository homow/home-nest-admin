"use client";

import {MainComponentProps} from "@/types/ui";
import queryClient from "@/lib/api/configs/react-query";
import {QueryClientProvider} from "@tanstack/react-query";

export default function ReactQueryProvider(
    {
        children
    }: MainComponentProps
) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    );
};