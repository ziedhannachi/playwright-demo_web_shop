import { expect, Page } from '@playwright/test';
import { LOCATORS } from '../../locators/login/LoginLocators';
import BaseAction from '../../utils/basePage';

export class LoginShopPage extends BaseAction {

  constructor(page: Page) {
    super(page);
  }

  public async fillEmailAndPassword(email: string, password: string) {
    await this.fillText(LOCATORS.username, email);
    await this.fillText(LOCATORS.password, password);
  }

  public async clickBtn() {
    await this.clickElements(LOCATORS.btnConnexion);
  }

  public async toolbarItemUser() {
    return await this.getText(LOCATORS.emailtxt);
  }

  public async verifyNavigation(expectedEmail: string) {
    const text = await this.getText(LOCATORS.emailtxt);
    expect(text).toContain(expectedEmail);
  }

  public async clickShoesCategory() {
    await this.clickElements(LOCATORS.appareilShoes);
  }

  public async verifyShoesPage() {
    await expect(this.page).toHaveURL(/shoes/i);
  }

  public async verifyLoginError() {
    const error = await this.getText(LOCATORS.errorMessage);
    expect(error).toContain('Login was unsuccessful');
  }

  public async clickLoginLink() {
    await this.clickElements(LOCATORS.loginLink);
  }

}
