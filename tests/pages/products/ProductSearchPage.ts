import BaseAction from '../../utils/basePage';
import { Page, expect } from '@playwright/test';
import { PRODUCT_SEARCH_LOCATORS } from '../../locators/products/ProductSearchLocators';

export class ProductSearchPage extends BaseAction {
  constructor(page: Page) {
    super(page);
  }

  async searchProduct(productName: string) {
    await this.page.fill(PRODUCT_SEARCH_LOCATORS.searchInput, productName);
    await this.page.click(PRODUCT_SEARCH_LOCATORS.searchButton);
  }

async verifyResultsDisplayed() {
  await expect(this.page.locator(PRODUCT_SEARCH_LOCATORS.productItem).first()).toBeVisible();
}

  async verifyNoResultsDisplayed() {
    await expect(this.page.locator(PRODUCT_SEARCH_LOCATORS.noResultMessage))
      .toContainText('No products were found');
  }

  async sortByLowestPrice() {
    await this.page.selectOption(PRODUCT_SEARCH_LOCATORS.sortDropdown, '10');
  }

  async getFirstProductPrice(): Promise<number> {
    const text = await this.page
      .locator(PRODUCT_SEARCH_LOCATORS.productPrice)
      .first()
      .textContent();

    return parseFloat(text!.replace(/[^0-9.]/g, ''));
  }

  async addFirstProductToCart() {
    await this.page
      .locator(PRODUCT_SEARCH_LOCATORS.addToCartBtn)
      .first()
      .click();
  }
}
