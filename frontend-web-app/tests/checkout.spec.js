import { test } from "@playwright/test";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";


test(
  "User can complete checkout successfully",
  async ({ page }) => {

    // =========================================
    // 1. REGISTER
    // =========================================

    const registerPage = new RegisterPage(page);

    await registerPage.open();

    await registerPage.register(
      "Test User",
      "testuser@example.com",
      "Test@123"
    );

    await registerPage.verifyRegistrationSuccess();


    // =========================================
    // 2. LOGIN
    // =========================================

    const loginPage = new LoginPage(page);

    await loginPage.login(
      "testuser@example.com",
      "Test@123"
    );

    await loginPage.verifyLoginSuccess();


    // =========================================
    // 3. PRODUCTS
    // =========================================

    const productsPage = new ProductsPage(page);

    await productsPage.addProduct(1);

    await productsPage.verifyProductAdded(
      "Wireless Headphones"
    );


    // =========================================
    // 4. CART
    // =========================================

    const cartPage = new CartPage(page);

    await cartPage.open();

    await cartPage.verifyProductInCart(1);

    await cartPage.verifyQuantity(1, 1);


    // =========================================
    // 5. CHECKOUT
    // =========================================

    await cartPage.proceedToCheckout();

    const checkoutPage = new CheckoutPage(page);

    await checkoutPage.fillCustomerDetails(
      "Test User",
      "testuser@example.com",
      "9876543210",
      "123 Test Street",
      "Vijayawada",
      "520001"
    );


    // =========================================
    // 6. PAYMENT
    // =========================================

    await checkoutPage.selectPaymentMethod(
      "Cash on Delivery"
    );


    // =========================================
    // 7. PLACE ORDER
    // =========================================

    await checkoutPage.placeOrder();


    // =========================================
    // 8. VERIFY ORDER SUCCESS
    // =========================================

    const orderSuccessPage =
      new OrderSuccessPage(page);

    await orderSuccessPage.verifyOrderSuccess();

  }
);