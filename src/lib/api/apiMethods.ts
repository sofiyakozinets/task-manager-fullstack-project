import { ApiClient } from "./ApiClient";

// Get the Singleton instance
const taskApi = ApiClient.getInstance();

export const createTask = taskApi.createTask.bind(taskApi);
export const deleteTask = taskApi.deleteTask.bind(taskApi);
export const fetchTask = taskApi.fetchTask.bind(taskApi);
export const fetchTasks = taskApi.fetchTasks.bind(taskApi);
export const updateTask = taskApi.updateTask.bind(taskApi);
