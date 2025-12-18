import { Page, expect } from '@playwright/test';
import BaseAction from '../../utils/basePage';
import { HEADER_LOCATORS } from '../../locators/header/HeaderLocators';

export class HeaderPage extends BaseAction {
  constructor(page: Page) {
    super(page);
  }

  public async verifyHeaderIsDisplayed() {
    await this.waitFor(HEADER_LOCATORS.logo);
    const logoVisible = await this.page.locator(HEADER_LOCATORS.logo).isVisible();
    expect(logoVisible).toBeTruthy();
  }

  public async verifyHeaderLinks() {
    const links = [
      HEADER_LOCATORS.loginLink,
      HEADER_LOCATORS.registerLink,
      HEADER_LOCATORS.shoppingCartLink,
      HEADER_LOCATORS.wishlistLink,
    ];

    for (const link of links) {
      const isVisible = await this.page.locator(link).isVisible();
      expect(isVisible).toBeTruthy();
    }
  }

  public async verifyMainMenuItems() {
    const menus = [
      HEADER_LOCATORS.computersMenu,
      HEADER_LOCATORS.electronicsMenu,
      HEADER_LOCATORS.apparelMenu,
      HEADER_LOCATORS.digitalDownloadsMenu,
      HEADER_LOCATORS.booksMenu,
      HEADER_LOCATORS.jewelryMenu,
      HEADER_LOCATORS.giftCardsMenu,
    ];

    for (const menu of menus) {
      const isVisible = await this.page.locator(menu).isVisible();
      expect(isVisible).toBeTruthy();
    }
  }
}
