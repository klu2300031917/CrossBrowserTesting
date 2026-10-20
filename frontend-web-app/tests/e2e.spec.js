import { test, expect } from "./fixtures";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";


test(
  "Complete TestFlow E2E workflow",
  async ({ page }) => {

    // =========================================
    // 1. REGISTER
    // =========================================

    const registerPage =
      new RegisterPage(page);

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

    const loginPage =
      new LoginPage(page);

    await loginPage.login(
      "testuser@example.com",
      "Test@123"
    );

    await loginPage.verifyLoginSuccess();


    // =========================================
    // 3. PRODUCTS
    // =========================================

    const productsPage =
      new ProductsPage(page);

    await expect(
      page.getByRole("heading", {
        name: /products/i
      })
    ).toBeVisible();


    // =========================================
    // 4. ADD PRODUCT TO CART
    // =========================================

    await productsPage.addProduct(1);

    await productsPage.verifyProductAdded(
      "Wireless Headphones"
    );


    // =========================================
    // 5. VERIFY CART DATA
    // =========================================

    await expect
      .poll(
        async () => {

          return await page.evaluate(() => {

            const storedCart =
              localStorage.getItem(
                "testflowCart"
              );

            if (!storedCart) {
              return false;
            }

            try {

              const cart =
                JSON.parse(storedCart);

              return cart.some(
                (item) =>
                  item.id === 1 &&
                  item.quantity >= 1
              );

            } catch {

              return false;

            }

          },
        },
        {
          timeout: 5000
        }
      )
      .toBe(true);


    // =========================================
    // 6. OPEN CART
    // =========================================

    const cartPage =
      new CartPage(page);

    // IMPORTANT:
    // Navigate using the React application
    // instead of page.goto("/cart")

    await productsPage.openCart();


    // =========================================
    // 7. VERIFY CART
    // =========================================

    await cartPage.verifyProductInCart(1);

    await cartPage.verifyQuantity(
      1,
      1
    );


    // =========================================
    // 8. CHECKOUT
    // =========================================

    await cartPage.proceedToCheckout();

    const checkoutPage =
      new CheckoutPage(page);


    await checkoutPage.fillCustomerDetails(
      "Test User",
      "testuser@example.com",
      "9876543210",
      "123 Test Street",
      "Vijayawada",
      "520001"
    );


    // =========================================
    // 9. PAYMENT
    // =========================================

    await checkoutPage.selectPaymentMethod(
      "Cash on Delivery"
    );


    // =========================================
    // 10. PLACE ORDER
    // =========================================

    await checkoutPage.placeOrder();


    // =========================================
    // 11. ORDER SUCCESS
    // =========================================

    const orderSuccessPage =
      new OrderSuccessPage(page);

    await orderSuccessPage.verifyOrderSuccess();

  }
);