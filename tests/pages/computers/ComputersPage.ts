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

    // Supprime tous les retours à la ligne, tabulations et espaces multiples
    productName = productName.replace(/[\n\r\t]+/g, ' ')  // remplace retours à la ligne et tab par un espace
      .replace(/\s+/g, ' ')      // remplace les espaces multiples par un seul
      .trim();                   // supprime les espaces début/fin

    // Affichage pour debug
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
}
