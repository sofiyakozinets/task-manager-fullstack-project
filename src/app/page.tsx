import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { fetchTasks } from "lib/api";
import App from "lib/components/App";
import { getQueryClient } from "lib/utils/getQueryClient";

const Page = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryFn: fetchTasks,
    queryKey: ["tasks"]
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <App />
    </HydrationBoundary>
  );
};

export default Page;
