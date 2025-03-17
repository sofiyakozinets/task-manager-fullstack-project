import { TaskFormInput, TaskInterface } from "lib/types";

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      resetTasks(): Chainable<Subject>;
      createTask(task: TaskFormInput): Chainable<TaskInterface>;
      createTaskUI(colorIndex?: number): Chainable<Subject>;
    }
  }
}
