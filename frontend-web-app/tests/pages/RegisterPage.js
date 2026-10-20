class RegisterPage {
  constructor(page) {
    this.page = page;

    this.nameInput = page.getByTestId("name-input");

    this.emailInput = page.getByTestId(
      "register-email-input"
    );

    this.passwordInput = page.getByTestId(
      "register-password-input"
    );

    this.registerButton = page.getByTestId(
      "register-submit"
    );

    this.registerMessage = page.getByTestId(
      "register-message"
    );
  }

  async open() {
    await this.page.goto("/register");
  }

  async register(name, email, password) {

    await this.nameInput.fill(name);

    await this.emailInput.fill(email);

    await this.passwordInput.fill(password);

    await this.registerButton.click();
  }

  async verifyRegistrationSuccess() {

    await this.registerMessage.waitFor({
      state: "visible"
    });

  }
}

export default RegisterPage;