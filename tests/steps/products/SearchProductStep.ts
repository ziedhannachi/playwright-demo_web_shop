import { When, Then } from '@cucumber/cucumber';
import { SearchPage } from '../../pages/products/SearchProductPage';
import { CustomWorld } from '../../utils/custom-world';

let selectedCheapestPrice = 0;
let searchedProductName = '';

When('I complete the field with {string}', async function(this: CustomWorld, keyword: string) {
    const searchPage = new SearchPage(this.page!);
    await searchPage.fillSearchField(keyword);
});

When('I click on the button {string}', async function (this: CustomWorld, buttonText: string) {
  const searchPage = new SearchPage(this.page!);
  await searchPage.clickSearchButton();
});

Then('The article should display', async function (this: CustomWorld) {
  const searchPage = new SearchPage(this.page!);
  await searchPage.verifyProductExists('digital SLR Camera');
});

Then('The product price should be at least {int}', async function (this: CustomWorld, minPrice: number) {
  const searchPage = new SearchPage(this.page!);
  await searchPage.verifyProductPriceAtLeast(minPrice);
});

When('I add the first searched product to the cart', async function (
  this: CustomWorld
) {
  const searchPage = new SearchPage(this.page!);

  // 🔹 Click on product picture
  await searchPage.clickOnFirstProductPicture();

  // 🔹 Compare prices and add cheapest
  selectedCheapestPrice = await searchPage.addCheapestProductToCart();

  // 🔹 Verify success message
  await searchPage.verifyAddToCartSuccessMessage();
});

Then('The product should be visible in the shopping cart', async function (
  this: CustomWorld
) {
  const searchPage = new SearchPage(this.page!);
  await searchPage.openShoppingCart();
  await searchPage.verifyProductInCart(searchedProductName);
});
