import { expect } from "@playwright/test";

class OrderSuccessPage {
  constructor(page) {

    this.page = page;

    this.successHeading = page.getByRole(
      "heading",
      {
        name: "Order Placed Successfully!"
      }
    );

    this.continueShoppingButton =
      page.getByTestId(
        "continue-shopping"
      );
  }

  async verifyOrderSuccess() {

    await expect(
      this.successHeading
    ).toBeVisible();

    await expect(
      this.continueShoppingButton
    ).toBeVisible();

  }

  async continueShopping() {

    await this.continueShoppingButton.click();

    await this.page.waitForURL(
      "**/products"
    );

  }
}

export default OrderSuccessPage;