import { ID, TaskInterface } from "lib/types";

describe("Task Page", () => {
  describe("Page", () => {
    let id: ID;

    before(() => {
      cy.resetTasks();

      cy.createTask({
        color: "WHITE",
        description: "Some description",
        title: "Some title"
      }).then((task: TaskInterface) => {
        id = task.id;
      });
    });

    beforeEach(() => {
      cy.visit(`/task/${id}`);
    });

    it("should load the task page", () => {
      cy.get("[data-cy=task-expanded]").should("be.visible");
    });

    it("should allow marking a task as completed", () => {
      cy.get("[data-cy=task-expanded]")
        .as("taskExpanded")
        .find("[data-cy=task-expanded-complete-button]")
        .should("be.visible")
        .and("contain", "Complete")
        .click();

      cy.get("@taskExpanded")
        .find("[data-cy=task-expanded-complete-button]")
        .should("be.visible")
        .and("contain", "Undo");
    });

    it("should allow marking a task as uncompleted", () => {
      cy.get("[data-cy=task-expanded]")
        .as("taskExpanded")
        .find("[data-cy=task-expanded-complete-button]")
        .should("be.visible")
        .and("contain", "Undo")
        .click();

      cy.get("@taskExpanded")
        .find("[data-cy=task-expanded-complete-button]")
        .should("be.visible")
        .and("contain", "Complete");
    });

    it("should allow deleting a task", () => {
      cy.get("[data-cy=task-expanded]")
        .find("[data-cy=task-expanded-delete-button]")
        .should("be.visible")
        .and("contain", "Delete")
        .click();

      cy.url().should("eq", `${Cypress.config().baseUrl}/`);
    });
  });

  describe("Redirect", () => {
    it("should go back to all tasks", () => {
      cy.resetTasks();

      cy.createTask({
        color: "WHITE",
        description: "Some description",
        title: "Some title"
      }).then((task: TaskInterface) => {
        cy.visit(`/task/${task.id}`);

        cy.get("[data-cy=back-button]")
          .should("be.visible")
          .and("contain", "Back to all tasks")
          .click();

        cy.url().should("eq", `${Cypress.config().baseUrl}/`);
      });
    });
  });
});
