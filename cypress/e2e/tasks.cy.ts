import { TaskInterface } from "lib/types";

describe("Tasks Page", () => {
  describe("Page", () => {
    before(() => {
      cy.resetTasks();
    });

    beforeEach(() => {
      cy.visit("/");
    });

    it("should load the tasks page", () => {
      cy.contains("All tasks").should("be.visible");
    });

    it("should display an empty state", () => {
      cy.contains("No tasks yet...").should("be.visible");
      cy.get("[data-cy=task-item]").should("have.length", 0);
    });

    it("should create a new task", () => {
      cy.get("[data-cy=create-task-trigger-button]")
        .should("be.visible")
        .and("contain", "Create a task")
        .click();

      // opens a modal
      cy.get("[data-cy=create-task-modal]")
        .should("be.visible")
        .as("createTaskModal");
      cy.get("@createTaskModal").contains("Create a task").should("be.visible");

      // fills and submits a form
      cy.get("@createTaskModal").within(() => {
        cy.get("[data-cy=title-input]").type("Some title");
        cy.get("[data-cy=description-input]").type("Some description");
        cy.get("[data-cy=color-picker] .mantine-ColorPicker-swatches button")
          .first()
          .click();
        cy.get("[data-cy=create-task-submit-button]")
          .should("be.visible")
          .and("contain", "Save")
          .click();
      });

      // closes a modal
      cy.get("@createTaskModal").should("not.be.visible");

      cy.createTaskUI(2);
      cy.createTaskUI(3);
    });

    it("should display a list of tasks", () => {
      cy.get("[data-cy=task-item]").should("have.length", 3);
    });

    it("should allow marking a task as completed", () => {
      cy.get("[data-cy=task-item]")
        .as("taskItems")
        .first()
        .find("[data-cy=task-complete-button]")
        .should("be.visible")
        .and("contain", "Complete")
        .click();

      // moves the completed task to the end of the list
      cy.get("@taskItems")
        .last()
        .find("[data-cy=task-complete-button]")
        .should("be.visible")
        .and("contain", "Undo");
    });

    it("should allow marking a task as uncompleted", () => {
      cy.get("[data-cy=task-item]")
        .as("taskItems")
        .last()
        .find("[data-cy=task-complete-button]")
        .should("be.visible")
        .and("contain", "Undo")
        .click();

      // moves the undone task to the beginning of the list
      cy.get("@taskItems")
        .first()
        .find("[data-cy=task-complete-button]")
        .should("be.visible")
        .and("contain", "Complete");
    });

    it("should allow deleting a task", () => {
      cy.get("[data-cy=task-item]")
        .as("taskItems")
        .then((tasks) => {
          cy.get("@taskItems")
            .first()
            .find("[data-cy=task-delete-button]")
            .should("be.visible")
            .and("contain", "Delete")
            .click();

          cy.get("@taskItems").should("have.length", tasks.length - 1);
        });
    });
  });

  describe("Redirect", () => {
    it("should open a task", () => {
      cy.resetTasks();

      cy.createTask({
        color: "WHITE",
        description: "Some description",
        title: "Some title"
      }).then((task: TaskInterface) => {
        cy.visit("/");

        cy.get("[data-cy=task-item]")
          .first()
          .find("[data-cy=task-open-icon]")
          .should("be.visible")
          .click();

        cy.url().should("include", `/task/${task.id}`);
      });
    });
  });
});
