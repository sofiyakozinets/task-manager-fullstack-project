import { ID, TaskInterface } from "./task";

// Template literal type for API paths
export type ApiPath = "/api/tasks" | `/api/tasks/${ID}`;

export type ApiEndpoints = {
  fetchTasks: Array<TaskInterface>;
  fetchTask: TaskInterface;
  createTask: TaskInterface;
  updateTask: TaskInterface;
  deleteTask: void;
};

export type ApiResponses = {
  [K in keyof ApiEndpoints]: Promise<ApiEndpoints[K]>;
};

export type ApiErrors = {
  [K in keyof ApiEndpoints]: {
    404?: string;
    default: string;
  };
};
