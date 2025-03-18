import { ApiPath, ID } from "lib/types";

export const deleteTask = async ({ id }: { id: ID }): Promise<void> => {
  const response = await fetch(`/api/tasks/${id}` as ApiPath, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Failed to delete the task");
  }
};
