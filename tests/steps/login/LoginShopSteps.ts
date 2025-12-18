import { DataTable, Given, Then, When } from "@cucumber/cucumber";
import { LoginShopPage } from "../../pages/login/LoginShopPage";
import { CustomWorld } from "../../utils/custom-world";
import { MESSAGE } from "../../constants/Const";

Given('I navigate to webShop website', async function (this: CustomWorld) {
  const page = this.page!;
  const loginPageUrl = this.parameters.appurl;
  await page.goto(loginPageUrl);
});

When('I enter valid credentials', async function (this: CustomWorld, dataTable: DataTable) {
  const page = this.page!;
  const loginPage = new LoginShopPage(page);
  const formData = dataTable.rowsHash();

  const email = formData.email === '{userEmail}' ? MESSAGE.userAddress : formData.email;

  await loginPage.fillEmailAndPassword(email, formData.password);
});

When('I click on the Log in link', async function (this: CustomWorld) {
  const page = this.page!;
  const loginPage = new LoginShopPage(page);
  await loginPage.clickLoginLink();
});

When('I click on the Log in button', async function (this: CustomWorld) {
  const page = this.page!;
  const loginPage = new LoginShopPage(page);
  await loginPage.clickBtn();
});

Then('I verify that I am redirected to the homepage with email {string}', async function (this: CustomWorld, expectedEmail: string) {
    const page = this.page!;
    const loginPage = new LoginShopPage(page);
    const emailToCheck = expectedEmail === '{userEmail}' ? MESSAGE.userAddress : expectedEmail;

    await loginPage.verifyNavigation(emailToCheck);
  }
);

/**
 * Login and Navigate
 */
When('I click on Shoes category', async function (this: CustomWorld) {
  const page = this.page!;
  const loginPage = new LoginShopPage(page);
  await loginPage.clickShoesCategory();
});

Then('I verify that Shoes page is displayed', async function (this: CustomWorld) {
  const page = this.page!;
  const loginPage = new LoginShopPage(page);
  await loginPage.verifyShoesPage();
});

/**
 * Login Failed
 */
Then('I verify login error message is displayed', async function (this: CustomWorld) {
  const page = this.page!;
  const loginPage = new LoginShopPage(page);
  await loginPage.verifyLoginError();
});
