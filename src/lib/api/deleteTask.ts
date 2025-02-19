import { IDInterface } from "lib/types";

export const deleteTask = async ({ id }: IDInterface): Promise<any> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`,
    {
      method: "DELETE"
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete the task");
  }

  return response.json();
};
