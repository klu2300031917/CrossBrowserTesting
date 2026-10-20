import { test } from "@playwright/test";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

test("User registration and login should work successfully", async ({ page }) => {

  const registerPage = new RegisterPage(page);

  await registerPage.open();

  await registerPage.register(
    "Test User",
    "testuser@example.com",
    "Test@123"
  );

  await registerPage.verifyRegistrationSuccess();

  const loginPage = new LoginPage(page);

  await loginPage.login(
    "testuser@example.com",
    "Test@123"
  );

  await loginPage.verifyLoginSuccess();

});