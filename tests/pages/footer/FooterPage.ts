import { Page, expect } from '@playwright/test';
import BaseAction from '../../utils/basePage';
import { FOOTER_LOCATORS } from '../../locators/footer/FooterLocators';

export class FooterPage extends BaseAction {
  constructor(page: Page) {
    super(page);
  }

  public async verifyFooterLinkExists(linkName: keyof typeof FOOTER_LOCATORS) {
    const link = await this.getText(FOOTER_LOCATORS[linkName]);
    expect(link).toBeTruthy();
  }

  public async subscribeNewsletter(email: string) {
    await this.fillText(FOOTER_LOCATORS.newsletterInput, email);
    await this.clickElements(FOOTER_LOCATORS.newsletterSubscribeBtn);
  }

  public async verifyNewsletterSuccess() {
    const successMsg = await this.getText(FOOTER_LOCATORS.newsletterResult);
    expect(successMsg).toContain('Thank you for signing up! A verification email has been sent. We appreciate your interest.'); 
  }
}
