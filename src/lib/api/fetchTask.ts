import { IDInterface, TaskInterface } from "lib/types";

export const fetchTask = async ({
  id
}: IDInterface): Promise<Readonly<TaskInterface>> => {
  const response = await fetch(`/api/tasks/${id}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Task with this ID does not exist");
    }

    throw new Error("Failed to fetch the task");
  }

  return response.json();
};
