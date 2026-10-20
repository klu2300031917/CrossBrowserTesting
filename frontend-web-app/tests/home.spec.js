import { test } from "@playwright/test";
import HomePage from "./pages/HomePage";

test("Home page should load successfully", async ({ page }) => {

  const homePage = new HomePage(page);

  await homePage.open();

  await homePage.verifyHomePage();

});