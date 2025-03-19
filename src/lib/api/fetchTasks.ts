import { ApiPath, TaskInterface } from "lib/types";

export const fetchTasks = async (): Promise<TaskInterface[]> => {
  const response = await fetch("/api/tasks" as ApiPath);

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return response.json();
};
