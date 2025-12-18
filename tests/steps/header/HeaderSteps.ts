import { Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../utils/custom-world';
import { HeaderPage } from '../../pages/header/HeaderPage';

Then('I verify the header is displayed', async function (this: CustomWorld) {
  const page = this.page!;
  const headerPage = new HeaderPage(page);
  await headerPage.verifyHeaderIsDisplayed();
});

Then('I verify header navigation links', async function (this: CustomWorld) {
  const page = this.page!;
  const headerPage = new HeaderPage(page);
  await headerPage.verifyHeaderLinks();
});

Then('I verify header main menu items', async function (this: CustomWorld) {
  const page = this.page!;
  const headerPage = new HeaderPage(page);
  await headerPage.verifyMainMenuItems();
});
