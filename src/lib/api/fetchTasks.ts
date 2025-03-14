import { TaskInterface } from "lib/types";

export const fetchTasks = async (): Promise<ReadonlyArray<TaskInterface>> => {
  const response = await fetch("/api/tasks");

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return response.json();
};
