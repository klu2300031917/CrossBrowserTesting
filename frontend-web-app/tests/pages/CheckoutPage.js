import { expect } from "@playwright/test";

class CheckoutPage {
  constructor(page) {
    this.page = page;

    this.nameInput = page.getByTestId("checkout-name");

    this.emailInput = page.getByTestId("checkout-email");

    this.phoneInput = page.getByTestId("checkout-phone");

    this.addressInput = page.getByTestId("checkout-address");

    this.cityInput = page.getByTestId("checkout-city");

    this.pincodeInput = page.getByTestId("checkout-pincode");

    this.placeOrderButton = page.getByTestId(
      "place-order"
    );
  }

  async open() {
    await this.page.goto("/checkout", {
      waitUntil: "domcontentloaded"
    });

    await expect(
      this.page.getByRole("heading", {
        name: "Checkout"
      })
    ).toBeVisible();
  }

  async fillCustomerDetails(
    name,
    email,
    phone,
    address,
    city,
    pincode
  ) {
    await this.nameInput.fill(name);

    await this.emailInput.fill(email);

    await this.phoneInput.fill(phone);

    await this.addressInput.fill(address);

    await this.cityInput.fill(city);

    await this.pincodeInput.fill(pincode);
  }

  async selectPaymentMethod(paymentMethod) {
    await this.page
      .getByLabel(paymentMethod)
      .check();
  }

  async placeOrder() {
    await this.placeOrderButton.click();

    await this.page.waitForURL("**/order-success");
  }
}

export default CheckoutPage;