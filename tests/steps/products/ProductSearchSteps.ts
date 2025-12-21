import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../../utils/custom-world';
import { ProductSearchPage } from '../../pages/products/ProductSearchPage';
import { ShoppingCartPage } from '../../pages/products/ShoppingCartPage';

/**
 * SEARCH
 */
When('I search for the product {string}', async function (
    this: CustomWorld,
    productName: string
) {
    this.searchedProductName = productName;
    const page = new ProductSearchPage(this.page!);
    await page.searchProduct(productName);
});

Then('search results should be displayed', async function (this: CustomWorld) {
    const page = new ProductSearchPage(this.page!);
    await page.verifyResultsDisplayed();
});

Then('no product should be displayed', async function (this: CustomWorld) {
    const page = new ProductSearchPage(this.page!);
    await page.verifyNoResultsDisplayed();
});

Then('the first product price should be at least {int}', async function (
    this: CustomWorld,
    minPrice: number
) {
    const page = new ProductSearchPage(this.page!);
    const price = await page.getFirstProductPrice();
    expect(price).toBeGreaterThanOrEqual(minPrice);
});

/**
 * SORT
 */
When('I sort products by price from low to high', async function (
    this: CustomWorld
) {
    const page = new ProductSearchPage(this.page!);
    await page.sortByLowestPrice();
});

/**
 * CART
 */
When('I add the first product to the cart', async function (
    this: CustomWorld
) {
    const page = new ProductSearchPage(this.page!);
    await page.addFirstProductToCart();
});

When('I update the cart quantity to {int}', async function (
    this: CustomWorld,
    quantity: number
) {
    const cart = new ShoppingCartPage(this.page!);
    await cart.openCart();
    await cart.updateQuantity(quantity);
});

Then('the cart total price should be at least {int}', async function (
    this: CustomWorld,
    minPrice: number
) {
    const cart = new ShoppingCartPage(this.page!);
    await cart.verifyTotalPriceAtLeast(minPrice);
});
