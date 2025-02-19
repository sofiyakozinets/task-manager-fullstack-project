import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    env: {
      API_URL: "http://localhost:5001"
    },
    supportFile: "cypress/support/e2e.ts"
  }
});
