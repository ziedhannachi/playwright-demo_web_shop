import { Page, expect } from '@playwright/test';
import BaseAction from '../../utils/basePage';
import { AUTH_LOCATORS } from '../../locators/login/AuthLocators';

export class RegisterPage extends BaseAction {
  public generatedEmail!: string;

  constructor(page: Page) {
    super(page);
  }

  public async openRegisterPage() {
    await this.clickElements(AUTH_LOCATORS.registerLink);
  }

  public async fillRegistrationForm() {
    const firstName = this.generateRandomFirstName();
    const lastName = this.generateRandomLastName();
    this.generatedEmail = this.generateRandomEmail();

    await this.clickElements(AUTH_LOCATORS.genderMale);
    await this.fillText(AUTH_LOCATORS.firstName, firstName);
    await this.fillText(AUTH_LOCATORS.lastName, lastName);
    await this.fillText(AUTH_LOCATORS.email, this.generatedEmail);
    await this.fillText(AUTH_LOCATORS.password, 'Password123!');
    await this.fillText(AUTH_LOCATORS.confirmPassword, 'Password123!');
    await this.clickElements(AUTH_LOCATORS.registerBtn);
  }

  public async verifyRegistrationSuccess() {
    const result = await this.getText(AUTH_LOCATORS.registerResult);
    expect(result).toContain('Your registration completed');
  }
}
