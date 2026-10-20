import { test, expect } from "@playwright/test";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";

test("User can login and add a product to cart", async ({ page }) => {

  // Register
  const registerPage = new RegisterPage(page);

  await registerPage.open();

  await registerPage.register(
    "Test User",
    "testuser@example.com",
    "Test@123"
  );

  await registerPage.verifyRegistrationSuccess();


  // Login
  const loginPage = new LoginPage(page);

  await loginPage.login(
    "testuser@example.com",
    "Test@123"
  );

  await loginPage.verifyLoginSuccess();


  // Products
  const productsPage = new ProductsPage(page);

  await expect(
    page.getByRole("heading", {
      name: /products/i
    })
  ).toBeVisible();


  // Add Wireless Headphones
  await productsPage.addProduct(1);

  await productsPage.verifyProductAdded(
    "Wireless Headphones"
  );

});