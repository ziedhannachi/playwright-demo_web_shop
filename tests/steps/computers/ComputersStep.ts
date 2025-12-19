import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { ComputersPage } from '../../pages/computers/ComputersPage';
import { CustomWorld } from '../../utils/custom-world';
import { PricePage } from '../../pages/PricePage';
import { PriceStore } from '../../utils/PriceStore';

let selectedDesktopPrice: number = 0; 
let desktopPrices: number[] = [];

/**
 * Computers / Desktops
 */
When('I navigate to Computers module', async function (this: CustomWorld) {
  const page = this.page!;
  const computersPage = new ComputersPage(page);
  await computersPage.goToComputers();
});

When('I go to Desktops', async function (this: CustomWorld) {
  const page = this.page!;
  const computersPage = new ComputersPage(page);
  await computersPage.goToDesktops();
});

When('I add the first product to cart', async function (this: CustomWorld) {
  const page = this.page!;
  const computersPage = new ComputersPage(page);
  await computersPage.addFirstProductToCart();
});

When('I navigate to shopping cart', async function (this: CustomWorld) {
  const page = this.page!;
  const computersPage = new ComputersPage(page);
  await computersPage.goToShoppingCart();
});

Then('I should see the product {string} in cart', async function (this: CustomWorld, productName: string) {
  const page = this.page!;
  const computersPage = new ComputersPage(page);
  await computersPage.verifyProductInCart(productName);
});

/**
 * Computers / Notebooks
 */
When('I go to Notebooks', async function(this: CustomWorld) {
  const page = this.page!;
  const computersPage = new ComputersPage(page);
  await computersPage.goToNotebooks();
});

When('I add the first notebook to cart', async function(this: CustomWorld) {
  const page = this.page!;
  const computersPage = new ComputersPage(page);
  await computersPage.addFirstNotebookToCart();
});

When('I proceed to checkout', async function(this: CustomWorld) {
  const page = this.page!;
  const computersPage = new ComputersPage(page);
  await computersPage.proceedToCheckout();
});

When('I click on terms of service', async function(this: CustomWorld) {
  const page = this.page!;
  const computersPage = new ComputersPage(page);
  await computersPage.clickOnTermsOfServices();
});

When('I complete the checkout process', async function(this: CustomWorld) {
  const page = this.page!;
  const computersPage = new ComputersPage(page);
  await computersPage.completeCheckout();
});

Then('I should see the order confirmation', async function(this: CustomWorld) {
  const page = this.page!;
  const computersPage = new ComputersPage(page);
  await computersPage.verifyOrderConfirmation();
});

/**
 * Compare price
 */
Then('I collect the prices of all displayed desktops', async function (this: CustomWorld) {
  const computersPage = new ComputersPage(this.page!);
  PriceStore.desktopPrices = await computersPage.getDesktopPrices();
  console.log('Collected desktop prices:', PriceStore.desktopPrices);
});

Then('I verify that desktop prices can be compared', async function () {
  const prices = PriceStore.desktopPrices;
  expect(prices.length).toBeGreaterThan(1);
  prices.forEach(price => expect(price).toBeGreaterThan(0));
});

Then('I select the cheapest desktop price for desktop', async function () {
  const computersPage = new ComputersPage(this.page!);
  const cheapestPrice = computersPage.getCheapestPrice(desktopPrices);

  console.log('Cheapest desktop price:', cheapestPrice);
  expect(cheapestPrice).toBeGreaterThan(0);
});

Then('I select the cheapest desktop price', async function () {
  /*const computersPage = new ComputersPage(this.page!);
  const cheapestPrice = computersPage.getCheapestPrice(desktopPrices);

  console.log('Cheapest desktop price:', cheapestPrice);
  expect(cheapestPrice).toBeGreaterThan(0);*/

    const prices = PriceStore.desktopPrices;
  const minPrice = Math.min(...prices);
  PriceStore.selectedDesktopPrice = minPrice;
  console.log('Selected desktop price:', minPrice);
  expect(minPrice).toBeGreaterThan(0);
});

