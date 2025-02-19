import { IDInterface, TaskInterface } from "lib/types";

export const fetchTask = async ({
  id
}: IDInterface): Promise<Readonly<TaskInterface>> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch the task");
  }

  return response.json();
};
