import { ApiPath, CreateTaskData, TaskInterface } from "lib/types";

export const createTask = async ({
  color,
  description,
  title
}: CreateTaskData): Promise<TaskInterface> => {
  const response = await fetch("/api/tasks" as ApiPath, {
    body: JSON.stringify({ color, description, title }),
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST"
  });

  if (!response.ok) {
    throw new Error("Failed to create a task");
  }

  return response.json();
};
