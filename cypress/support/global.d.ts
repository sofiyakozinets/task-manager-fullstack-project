import { FormInput, TaskInterface } from "lib/types";

declare global {
  namespace Cypress {
    interface Chainable {
      resetTasks(): Chainable<void>;
      createTask({
        color,
        description,
        title
      }: FormInput): Chainable<TaskInterface>;
      createTaskUI(colorIndex?: number): Chainable<void>;
    }
  }
}
