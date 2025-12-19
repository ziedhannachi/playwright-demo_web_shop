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
  await this.page.waitForSelector(COMPUTER_LOCATORS.desktopPrice);

  const prices = await this.page.$$eval(
    COMPUTER_LOCATORS.desktopPrice,
    elements => elements.map(el => {
      const text = el.textContent?.trim() ?? '';
      const raw = text.replace(/[^0-9.,]/g, '');
      return parseFloat(raw.replace(',', '.'));
    })
  );

  console.log('Collected desktop prices:', prices);
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

  /**
 * Add a product to the cart by matching its price
 * @param price number - the price of the product to add
 */
public async addProductToCartByPrice(price: number) {
  await this.page.waitForSelector(COMPUTER_LOCATORS.desktopItems);

  // Récupérer tous les produits
  const products = await this.page.$$(COMPUTER_LOCATORS.desktopItems);

  for (const product of products) {
    // Récupérer le prix du produit
    const priceText = await product.$eval(
      COMPUTER_LOCATORS.desktopPrice,
      el => el.textContent?.trim() ?? ''
    );

   const numericPrice = parseFloat(priceText.replace(/[^0-9.,]/g, '').replace(',', '.'));
if (Math.abs(numericPrice - price) < 0.01) { // tolérance de 0.01
  const addButton = await product.$('input[value="Add to cart"]');
  if (addButton) {
    await addButton.click();
    console.log(`Added product with price ${price} to the cart.`);
    return;
  }
}
  }

  throw new Error(`No product found with price ${price}`);
}

public async verifyPriceInCart(expectedPrice: number) {
    const priceText = await this.getText('tr:has-text("Total") strong'); // ou le locator correct
    if (!priceText) throw new Error('Price element not found in cart');
    const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
    expect(price).toBe(expectedPrice);
}
}
