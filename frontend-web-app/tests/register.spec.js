import { test } from "@playwright/test";
import RegisterPage from "./pages/RegisterPage";

test("User registration should work successfully", async ({ page }) => {

  const registerPage = new RegisterPage(page);

  await registerPage.open();

  await registerPage.register(
    "Test User",
    "testuser@example.com",
    "Test@123"
  );

  await registerPage.verifyRegistrationSuccess();

});