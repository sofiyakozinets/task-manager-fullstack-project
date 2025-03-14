import { IDInterface } from "lib/types";

export const deleteTask = async ({ id }: IDInterface): Promise<any> => {
  const response = await fetch(`/api/tasks/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Failed to delete the task");
  }
};
