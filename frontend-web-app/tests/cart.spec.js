import { test } from "@playwright/test";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";

test("User can add product and open cart", async ({ page }) => {

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

  await productsPage.addProduct(1);

  await productsPage.verifyProductAdded(
    "Wireless Headphones"
  );


  // Cart
  const cartPage = new CartPage(page);

  await cartPage.open();

  await cartPage.verifyProductInCart(1);

  await cartPage.verifyQuantity(1, 1);

});