class HomePage {
  constructor(page) {
    this.page = page;

    this.heading = page.getByRole("heading", {
      name: "Automated Cross-Browser Testing"
    });

    this.exploreButton = page.getByTestId("explore-button");

    this.loginButton = page.getByTestId("home-login-button");
  }

  async open() {
    await this.page.goto("/");
  }

  async verifyHomePage() {
    await this.heading.waitFor({
      state: "visible"
    });

    await this.exploreButton.waitFor({
      state: "visible"
    });
  }

  async clickExplore() {
    await this.exploreButton.click();
  }

  async clickLogin() {
    await this.loginButton.click();
  }
}

export default HomePage;