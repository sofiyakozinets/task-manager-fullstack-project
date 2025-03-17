import { IDInterface, TaskFormInput, TaskInterface } from "lib/types";

export class ApiClient {
  private static instance: ApiClient;

  // Use singleton design pattern
  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }

    return ApiClient.instance;
  }

  private readonly baseUrl: string = "/api";

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  // eslint-disable-next-line class-methods-use-this
  private async handleResponse<T>(
    response: Response,
    errorContext: string,
    errorByStatus?: { [key: string]: string }
  ): Promise<T> {
    if (!response.ok) {
      const status = response.status.toString();

      if (errorByStatus && status in errorByStatus) {
        throw new Error(errorByStatus[status]);
      }

      throw new Error(`Failed to ${errorContext} with status ${status}`);
    }

    return response.json();
  }

  // eslint-disable-next-line class-methods-use-this
  private async handleEmptyResponse(
    response: Response,
    errorContext: string
  ): Promise<void> {
    if (!response.ok) {
      throw new Error(
        `Failed to ${errorContext} with status ${response.status}`
      );
    }
  }

  public async deleteTask({ id }: IDInterface): Promise<void> {
    const response = await fetch(`${this.baseUrl}/tasks/${id}`, {
      method: "DELETE"
    });

    await this.handleEmptyResponse(response, "delete the task");
  }

  public async fetchTasks(): Promise<TaskInterface[]> {
    const response = await fetch(`${this.baseUrl}/tasks`);

    return this.handleResponse<TaskInterface[]>(response, "fetch tasks");
  }

  public async fetchTask({ id }: IDInterface): Promise<TaskInterface> {
    const response = await fetch(`${this.baseUrl}/tasks/${id}`);

    return this.handleResponse<TaskInterface>(response, "fetch the task", {
      404: "Task with this ID does not exist"
    });
  }

  public async createTask(task: TaskFormInput): Promise<TaskInterface> {
    const response = await fetch(`${this.baseUrl}/tasks`, {
      body: JSON.stringify(task),
      headers: { "Content-Type": "application/json" },
      method: "POST"
    });

    return this.handleResponse<TaskInterface>(response, "create a task");
  }

  public async updateTask({
    id,
    ...updatedTask
  }: IDInterface & Partial<Omit<TaskInterface, "id">>): Promise<TaskInterface> {
    const response = await fetch(`${this.baseUrl}/tasks/${id}`, {
      body: JSON.stringify(updatedTask),
      headers: { "Content-Type": "application/json" },
      method: "PATCH"
    });

    return this.handleResponse<TaskInterface>(response, "update the task");
  }
}
