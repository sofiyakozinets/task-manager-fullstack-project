import { TaskInterface } from "lib/types";

export const fetchTasks = async (): Promise<ReadonlyArray<TaskInterface>> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`);

  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }

  return response.json();
};
