import "./commands";

Cypress.on("uncaught:exception", (error: Error): boolean => {
  if (error.message.includes("Hydration failed")) {
    return false;
  }
  return true;
});
