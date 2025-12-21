import BaseAction from '../../utils/basePage';
import { Page, expect } from '@playwright/test';
import { SHOPPING_CART_LOCATORS } from '../../locators/products/ShoppingCartLocators';

export class ShoppingCartPage extends BaseAction {
  constructor(page: Page) {
    super(page);
  }

  async openCart() {
    await this.page.click(SHOPPING_CART_LOCATORS.cartLink);
  }

  async updateQuantity(quantity: number) {
    await this.page.fill(
      SHOPPING_CART_LOCATORS.quantityInput,
      quantity.toString()
    );
    await this.page.click(SHOPPING_CART_LOCATORS.updateCartBtn);
  }

  async verifyTotalPriceAtLeast(minPrice: number) {
    const text = await this.page
      .locator(SHOPPING_CART_LOCATORS.totalPrice)
      .textContent();

    const price = parseFloat(text!.replace(/[^0-9.]/g, ''));
    expect(price).toBeGreaterThanOrEqual(minPrice);
  }
}
