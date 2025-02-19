import { FormInput } from "lib/types";

Cypress.Commands.add("resetTasks", (): void => {
  cy.request("POST", `${Cypress.env("API_URL")}/tasks/reset`);
});

Cypress.Commands.add(
  "createTask",
  ({ color, description, title }: FormInput): void => {
    cy.request("POST", `${Cypress.env("API_URL")}/tasks`, {
      color,
      description,
      title
    }).then((response) => {
      expect(response.status).to.eq(200);
      return response.body;
    });
  }
);

Cypress.Commands.add("createTaskUI", (colorIndex?: number): void => {
  cy.get("[data-cy=create-task-trigger-button]")
    .should("be.visible")
    .and("contain", "Create a task")
    .click();

  // fills and submits a form
  cy.get("[data-cy=create-task-modal]")
    .should("be.visible")
    .within(() => {
      cy.get("[data-cy=title-input]").type("Some title");
      cy.get("[data-cy=description-input]").type("Some description");
      cy.get("[data-cy=color-picker] .mantine-ColorPicker-swatches button")
        .eq(colorIndex ?? 0)
        .click();
      cy.get("[data-cy=create-task-submit-button]")
        .should("be.visible")
        .and("contain", "Save")
        .click();
    });
});
