import { Page } from '@playwright/test';

/**
 * @author Zied Hannachi
 */
export default class BaseAction {
  public page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /* ================= ACTIONS ================= */

  public async clickElements(selector: string) {
    await this.waitFor(selector);
    await this.page.click(selector);
  }

  public async fillText(selector: string, value: string) {
    await this.waitFor(selector);
    await this.page.fill(selector, value);
  }

  public async waitFor(selector: string) {
    await this.page.waitForSelector(selector);
  }

  public async getText(selector: string) {
    await this.waitFor(selector);
    return (await this.page.locator(selector).textContent()) ?? '';
  }

  public async getPageTitle() {
    return this.page.title();
  }

  /* ================= RANDOM DATA ================= */

  /** Generate random first name */
  public generateRandomFirstName(): string {
    return `FirstName_${Math.random().toString(36).substring(2, 8)}`;
  }

  /** Generate random last name */
  public generateRandomLastName(): string {
    return `LastName_${Math.random().toString(36).substring(2, 8)}`;
  }

  /** Generate unique random email */
  public generateRandomEmail(): string {
    const timestamp = Date.now();
    return `user_${timestamp}@testmail.com`;
  }
}
