"use client";

import {MainComponentProps} from "@/types/ui";
import queryClient from "@/lib/api/configs/react-query";
import {QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

export default function ReactQueryProvider(
    {
        children
    }: MainComponentProps
) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    );
};