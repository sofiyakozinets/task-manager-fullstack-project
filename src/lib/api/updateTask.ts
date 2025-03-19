import { ApiPath, ID, TaskInterface, UpdateTaskData } from "lib/types";

export const updateTask = async ({
  id,
  ...updatedTask
}: {
  id: ID;
} & UpdateTaskData): Promise<TaskInterface> => {
  const response = await fetch(`/api/tasks/${id}` as ApiPath, {
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
