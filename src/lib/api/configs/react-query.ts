import {QueryClient} from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            retryDelay: 1000,
            gcTime: 60_000 * 60,
            staleTime: 60_000 * 5,
            refetchOnWindowFocus: false,
        }
    }
});

export default queryClient;