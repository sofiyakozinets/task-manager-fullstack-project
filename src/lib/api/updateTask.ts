import { IDInterface, TaskInterface } from "lib/types";

export const updateTask = async ({
  id,
  ...updatedTask
}: IDInterface & Partial<Omit<TaskInterface, "id">>): Promise<
  Readonly<TaskInterface>
> => {
  const response = await fetch(`/api/tasks/${id}`, {
    body: JSON.stringify(updatedTask),
    headers: {
      "Content-Type": "application/json"
    },
    method: "PATCH"
  });

  if (!response.ok) {
    throw new Error("Failed to update the task");
  }

  return response.json();
};
