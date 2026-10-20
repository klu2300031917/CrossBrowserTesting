import { expect } from "@playwright/test";


class ProductsPage {

  constructor(page) {

    this.page = page;

    this.searchInput =
      page.getByTestId(
        "product-search"
      );

    this.categoryFilter =
      page.getByTestId(
        "category-filter"
      );

    this.cartMessage =
      page.getByTestId(
        "cart-message"
      );

    this.cartLink =
      page.getByRole(
        "link",
        {
          name: "Cart"
        }
      );

  }


  // =========================================
  // OPEN PRODUCTS
  // =========================================

  async open() {

    await this.page.goto(
      "/products",
      {
        waitUntil:
          "domcontentloaded"
      }
    );

    await expect(
      this.page.getByRole(
        "heading",
        {
          name: /products/i
        }
      )
    ).toBeVisible();

  }


  // =========================================
  // SEARCH PRODUCT
  // =========================================

  async searchProduct(
    productName
  ) {

    await this.searchInput.fill(
      productName
    );

  }


  // =========================================
  // CATEGORY
  // =========================================

  async selectCategory(
    category
  ) {

    await this.categoryFilter
      .selectOption(category);

  }


  // =========================================
  // ADD PRODUCT
  // =========================================

  async addProduct(
    productId
  ) {

    const addButton =
      this.page.getByTestId(
        `add-to-cart-${productId}`
      );

    await expect(
      addButton
    ).toBeVisible();

    await addButton.click();

  }


  // =========================================
  // VERIFY PRODUCT ADDED
  // =========================================

  async verifyProductAdded(
    productName
  ) {

    await expect(
      this.cartMessage
    ).toContainText(
      productName,
      {
        timeout: 5000
      }
    );

  }


  // =========================================
  // OPEN CART
  // =========================================

  async openCart() {

    await expect(
      this.cartLink
    ).toBeVisible();

    await this.cartLink.click();

    await this.page.waitForURL(
      "**/cart",
      {
        timeout: 10000
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
    ).toBeVisible();

  }

}


export default ProductsPage;