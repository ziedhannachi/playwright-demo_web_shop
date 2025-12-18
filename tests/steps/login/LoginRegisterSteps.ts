import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../../utils/custom-world';
import { RegisterPage } from '../../pages/login/RegisterPage';

const TEST_EMAIL = 'testuser@mail.com';
const TEST_PASSWORD = 'Password123!';
let registeredEmail: string;

/**
 * Register steps
 */
When('I click on Register link', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page!);
  await registerPage.openRegisterPage();
});


When('I fill the registration form with valid data', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page!);
  await registerPage.fillRegistrationForm();
  registeredEmail = registerPage.generatedEmail;
});

Then('I should see registration success message', async function (this: CustomWorld) {
  const registerPage = new RegisterPage(this.page!);
  await registerPage.verifyRegistrationSuccess();
});

