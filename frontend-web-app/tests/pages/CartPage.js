import { expect } from "@playwright/test";


class CartPage {

  constructor(page) {

    this.page = page;

    this.checkoutButton =
      page.getByTestId(
        "checkout-button"
      );

    this.clearCartButton =
      page.getByTestId(
        "clear-cart"
      );

    this.continueShoppingButton =
      page.getByTestId(
        "continue-shopping"
      );

  }


  // =========================================
  // OPEN CART
  // =========================================

  async open() {

    await this.page.goto(
      "/cart",
      {
        waitUntil:
          "domcontentloaded",
        timeout: 30000
      }
    );

    await expect(
      this.page.getByRole(
        "heading",
        {
          name:
            "Your Shopping Cart"
        }
      )
    ).toBeVisible({
      timeout: 10000
    });

  }


  // =========================================
  // VERIFY PRODUCT
  // =========================================

  async verifyProductInCart(
    productId
  ) {

    await expect(
      this.page.getByTestId(
        `cart-item-${productId}`
      )
    ).toBeVisible({
      timeout: 10000
    });

  }


  // =========================================
  // VERIFY QUANTITY
  // =========================================

  async verifyQuantity(
    productId,
    quantity
  ) {

    await expect(
      this.page.getByTestId(
        `quantity-${productId}`
      )
    ).toHaveText(
      String(quantity)
    );

  }


  // =========================================
  // INCREASE QUANTITY
  // =========================================

  async increaseQuantity(
    productId
  ) {

    await this.page
      .getByTestId(
        `increase-${productId}`
      )
      .click();

  }


  // =========================================
  // DECREASE QUANTITY
  // =========================================

  async decreaseQuantity(
    productId
  ) {

    await this.page
      .getByTestId(
        `decrease-${productId}`
      )
      .click();

  }


  // =========================================
  // REMOVE PRODUCT
  // =========================================

  async removeProduct(
    productId
  ) {

    await this.page
      .getByTestId(
        `remove-${productId}`
      )
      .click();

  }


  // =========================================
  // CHECKOUT
  // =========================================

  async proceedToCheckout() {

    await expect(
      this.checkoutButton
    ).toBeVisible();

    await this.checkoutButton.click();

    await this.page.waitForURL(
      "**/checkout",
      {
        timeout: 10000
      }
    );

  }

}


export default CartPage;