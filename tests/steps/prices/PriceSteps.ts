import { Given, When, Then, DataTable } from '@cucumber/cucumber';
import { PricePage } from '../../pages/prices/PricePage';
import { CustomWorld } from '../../utils/custom-world';
import { expect } from '@playwright/test';
import { PriceStore } from '../../utils/PriceStore';
import { ComputersPage } from '../../pages/computers/ComputersPage';

/**
 * Variables partagées
 */
let desktopPrices: number[] = [];
let notebookPrices: number[] = [];
let selectedPrice: number;
let selectedNotebookPrice: number;
let selectedDesktopPrice: number = 0;

/**
 * Collect prices
 */
Then('I collect the prices of all displayed notebooks', async function (this: CustomWorld) {
  const page = new ComputersPage(this.page!);
  PriceStore.notebookPrices = await page.getDesktopPrices(); 
  console.log('Collected Notebook prices:', PriceStore.notebookPrices);
});

/**
 * Add product to cart
 */
Then('I add the selected product to the cart', async function (this: CustomWorld) {
  const page = new PricePage(this.page!);
  selectedPrice = Math.min(...desktopPrices);
  console.log('Selected product price to add to cart:', selectedPrice);
  await page.addProductToCart('div.item-box', selectedPrice);
});

/**
 * Verify price in cart
 */
Then('I verify the price in the cart matches the selected price', async function (this: CustomWorld) {
  const page = new PricePage(this.page!);
  await page.openCart();
  await page.verifyPriceInCart(selectedPrice);
});

/**
 * Select max prices
 */
Then('I select the most expensive notebook price', async function () {
  const prices = PriceStore.notebookPrices;
  const maxPrice = Math.max(...prices);
  PriceStore.selectedNotebookPrice = maxPrice;
  console.log('Selected notebook price:', maxPrice);
  expect(maxPrice).toBeGreaterThan(0);
});

/**
 * Compare max prices
 */
Then('I compare the maximum prices between Desktop and Notebook', async function () {
  const desktopMax = Math.max(...PriceStore.desktopPrices);
  const notebookMax = Math.max(...PriceStore.notebookPrices);
  console.log(`Desktop max price: ${desktopMax}, Notebook max price: ${notebookMax}`);
  expect(desktopMax).toBeGreaterThan(0);
  expect(notebookMax).toBeGreaterThan(0);
});

/**
 * Add cheapest desktop
 */
Then('I add the cheapest desktop to the shopping cart', async function () {
  const page = new ComputersPage(this.page!);
  await page.addProductToCartByPrice(PriceStore.selectedDesktopPrice);
});


//cart
Then('I select the cheapest desktop priceN', async function () {
  if (!PriceStore.desktopPrices || PriceStore.desktopPrices.length === 0) {
    throw new Error('No desktop prices collected yet!');
  }
  PriceStore.selectedDesktopPrice = Math.min(...PriceStore.desktopPrices);
  console.log('Selected cheapest desktop price:', PriceStore.selectedDesktopPrice);
  expect(PriceStore.selectedDesktopPrice).toBeGreaterThan(0);
});

Then('I add the cheapest desktop to the shopping cartN', async function (this: CustomWorld) {
  const computersPage = new ComputersPage(this.page!);
  await computersPage.addProductToCartByPrice(PriceStore.selectedDesktopPrice);
});

Then('I verify the price in the cart matches the selected priceN', async function (this: CustomWorld) {
  const computersPage = new ComputersPage(this.page!);
  await computersPage.goToShoppingCart();
  await computersPage.verifyPriceInCart(PriceStore.selectedDesktopPrice); 
});