import { TaskFormInput, TaskInterface } from "lib/types";

export const createTask = async ({
  color,
  description,
  title
}: TaskFormInput): Promise<Readonly<TaskInterface>> => {
  const response = await fetch("/api/tasks", {
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
