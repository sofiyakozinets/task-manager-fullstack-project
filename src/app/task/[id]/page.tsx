import React from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { fetchTask } from "lib/api";
import TaskApp from "lib/components/TaskApp";
import { ID } from "lib/types";
import { getQueryClient } from "lib/utils/getQueryClient";

const TaskPage = async ({ params }: { params: Promise<{ id: ID }> }) => {
  const { id } = await params;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryFn: () => fetchTask({ id }),
    queryKey: ["task", id]
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <TaskApp id={id} />
    </HydrationBoundary>
  );
};

export default TaskPage;
