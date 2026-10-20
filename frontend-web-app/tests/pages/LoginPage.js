class LoginPage {
  constructor(page) {
    this.page = page;

    this.emailInput = page.getByTestId("email-input");

    this.passwordInput = page.getByTestId("password-input");

    this.loginButton = page.getByTestId("login-submit");

    this.loginMessage = page.getByTestId("login-message");
  }

  async open() {
    await this.page.goto("/login");
  }

  async login(email, password) {
    await this.emailInput.fill(email);

    await this.passwordInput.fill(password);

    await this.loginButton.click();

    await this.page.waitForTimeout(1500);
  }

  async verifyLoginSuccess() {
    await this.page.waitForURL("**/products", {
      timeout: 10000
    });
  }
}

export default LoginPage;