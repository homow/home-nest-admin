import {QueryClient} from "@tanstack/react-query";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 2,
            retryDelay: 1000,
            gcTime: 60_000 / 2,
            staleTime: 60_000 / 2,
            refetchOnWindowFocus: false,
        }
    }
});

export default queryClient;