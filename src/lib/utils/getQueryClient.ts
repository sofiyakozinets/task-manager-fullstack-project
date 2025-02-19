import { QueryClient } from "@tanstack/react-query";

let queryClient: QueryClient | null = null;

export const getQueryClient = (): QueryClient => {
  // Client-side: Use singleton design pattern
  if (typeof window !== "undefined") {
    if (!queryClient) {
      queryClient = new QueryClient();
    }

    return queryClient;
  }

  // Server-side: Always create a new instance
  return new QueryClient();
};
