import {
  ApiEndpoints,
  ApiErrors,
  ApiPath,
  ApiResponses,
  CreateTaskData,
  ID,
  UpdateTaskData
} from "lib/types";

export class ApiClient {
  private static instance: ApiClient;

  // Use Singleton design pattern
  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }

    return ApiClient.instance;
  }

  private readonly baseUrl: string = "/api";

  private readonly errorMessages: ApiErrors = {
    createTask: {
      default: "Failed to create a task"
    },
    deleteTask: {
      default: "Failed to delete the task"
    },
    fetchTask: {
      404: "Task with this ID does not exist",
      default: "Failed to fetch the task"
    },
    fetchTasks: {
      default: "Failed to fetch tasks"
    },
    updateTask: {
      default: "Failed to update the task"
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  private async handleResponse<K extends keyof ApiEndpoints>(
    response: Response,
    endpoint: K
  ): Promise<ApiEndpoints[K]> {
    if (!response.ok) {
      const errors: ApiErrors[K] = this.errorMessages[endpoint];

      if (response.status === 404 && errors[404]) {
        throw new Error(errors[404]);
      }

      throw new Error(errors.default);
    }

    return response.status === 204
      ? (undefined as void as ApiEndpoints[K])
      : response.json();
  }

  public async deleteTask({ id }: { id: ID }): ApiResponses["deleteTask"] {
    const response = await fetch(`${this.baseUrl}/tasks/${id}` as ApiPath, {
      method: "DELETE"
    });

    return this.handleResponse(response, "deleteTask");
  }

  public async fetchTasks(): ApiResponses["fetchTasks"] {
    const response = await fetch(`${this.baseUrl}/tasks` as ApiPath);

    return this.handleResponse(response, "fetchTasks");
  }

  public async fetchTask({ id }: { id: ID }): ApiResponses["fetchTask"] {
    const response = await fetch(`${this.baseUrl}/tasks/${id}` as ApiPath);

    return this.handleResponse(response, "fetchTask");
  }

  public async createTask(task: CreateTaskData): ApiResponses["createTask"] {
    const response = await fetch(`${this.baseUrl}/tasks` as ApiPath, {
      body: JSON.stringify(task),
      headers: { "Content-Type": "application/json" },
      method: "POST"
    });

    return this.handleResponse(response, "createTask");
  }

  public async updateTask({
    id,
    ...updatedTask
  }: {
    id: ID;
  } & UpdateTaskData): ApiResponses["updateTask"] {
    const response = await fetch(`${this.baseUrl}/tasks/${id}` as ApiPath, {
      body: JSON.stringify(updatedTask),
      headers: { "Content-Type": "application/json" },
      method: "PATCH"
    });

    return this.handleResponse(response, "updateTask");
  }
}
