import BaseAction from '../../utils/basePage';
import { Page, expect } from '@playwright/test';
import { COMPUTER_LOCATORS } from '../../locators/computers/ComputersLocators';

export class ComputersPage extends BaseAction {
  constructor(page: Page) {
    super(page);
  }

  public async goToComputers() {
    await this.clickElements(COMPUTER_LOCATORS.computersMenu);
  }

  public async goToDesktops() {
    await this.clickElements(COMPUTER_LOCATORS.desktopsSubmenu);
  }

  public async addFirstProductToCart() {
    await this.clickElements(COMPUTER_LOCATORS.firstProductAddToCart);
  }

  public async goToShoppingCart() {
    await this.clickElements(COMPUTER_LOCATORS.shoppingCartLink);
  }

  public async verifyProductInCart(expectedProduct: string) {
    let productName = await this.getText(COMPUTER_LOCATORS.cartItemName);
    if (!productName) throw new Error('Product name not found in cart');
    productName = productName.replace(/[\n\r\t]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    console.log('Normalized product name:', `"${productName}"`);

    expect(productName).toContain(expectedProduct);
  }


  public async goToNotebooks() {
    await this.clickElements(COMPUTER_LOCATORS.notebooksSubmenu);
  }

  public async addFirstNotebookToCart() {
    await this.clickElements(COMPUTER_LOCATORS.firstNotebookAddToCart);
  }

  public async proceedToCheckout() {
    await this.clickElements(COMPUTER_LOCATORS.checkoutButton);
  }

  public async clickOnTermsOfServices() {
    await this.clickElements(COMPUTER_LOCATORS.termsOfService);
  }

  public async completeCheckout() {
    await this.clickElements(COMPUTER_LOCATORS.billingSave);
    await this.clickElements(COMPUTER_LOCATORS.shippingSave);
    await this.clickElements(COMPUTER_LOCATORS.shippingMethod);
    await this.clickElements(COMPUTER_LOCATORS.paymentMethod);
    await this.clickElements(COMPUTER_LOCATORS.paymentInfoContinueBtn);
    await this.clickElements(COMPUTER_LOCATORS.confirmOrderBtn);
  }

  public async verifyOrderConfirmation() {
    const text = await this.getText(COMPUTER_LOCATORS.orderConfirmation);
    expect(text).toContain('Your order has been successfully processed!');
  }

  public async getDesktopPrices(): Promise<number[]> {
    await this.page.waitForSelector(COMPUTER_LOCATORS.desktopItems);

    const prices = await this.page.$$eval(
      `${COMPUTER_LOCATORS.desktopItems} ${COMPUTER_LOCATORS.desktopPrice}`,
      elements => elements.map(el => {
        const text = el.textContent?.trim() ?? '';
        const raw = text.replace(/[^0-9.,]/g, '');
        return parseFloat(raw.replace(',', '.'));
      })
    );
    return prices;
  }

  public async verifyPricesAreComparable(prices: number[]) {
    expect(prices.length).toBeGreaterThan(1);

    prices.forEach(price => {
      expect(price).toBeGreaterThan(0);
    });
  }

  public getCheapestPrice(prices: number[]): number {
    return Math.min(...prices);
  }
}
