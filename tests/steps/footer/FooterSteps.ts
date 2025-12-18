import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../utils/custom-world';
import { FooterPage } from '../../pages/footer/FooterPage';

Then('I verify the About Us link in footer exists', async function(this: CustomWorld) {
  const page = this.page!;
  const footerPage = new FooterPage(page);
  await footerPage.verifyFooterLinkExists('aboutUsLink');
});

Then('I verify the Sitemap link in footer exists', async function(this: CustomWorld) {
  const page = this.page!;
  const footerPage = new FooterPage(page);
  await footerPage.verifyFooterLinkExists('sitemapLink');
});

Then('I verify the Privacy Notice link in footer exists', async function(this: CustomWorld) {
  const page = this.page!;
  const footerPage = new FooterPage(page);
  await footerPage.verifyFooterLinkExists('privacyNoticeLink');
});

Then('I verify the Contact Us link in footer exists', async function(this: CustomWorld) {
  const page = this.page!;
  const footerPage = new FooterPage(page);
  await footerPage.verifyFooterLinkExists('contactUsLink');
});

When('I subscribe to the newsletter with email {string}', async function(this: CustomWorld, email: string) {
  const page = this.page!;
  const footerPage = new FooterPage(page);
  await footerPage.subscribeNewsletter(email);
});

Then('I should see a newsletter subscription confirmation', async function(this: CustomWorld) {
  const page = this.page!;
  const footerPage = new FooterPage(page);
  await footerPage.verifyNewsletterSuccess();
});
