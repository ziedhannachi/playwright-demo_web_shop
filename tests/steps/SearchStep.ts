import { Given, When, Then } from '@cucumber/cucumber';
import { SearchPage } from '../pages/SearchPage';
import { CustomWorld } from '../utils/custom-world';

When('I complete the field with {string}', async function(this: CustomWorld, keyword: string) {
    const searchPage = new SearchPage(this.page!);
    await searchPage.fillSearchField(keyword);
});

When('I click on the button {string}', async function(this: CustomWorld, buttonText: string) {
    const searchPage = new SearchPage(this.page!);
    await searchPage.clickSearchButton();
});

Then('The article should display', async function(this: CustomWorld) {
    const searchPage = new SearchPage(this.page!);
    await searchPage.verifyProductExists('digital SLR Camera');
});

Then('the product price should be at least {int}', async function(this: CustomWorld, minPrice: number) {
    const searchPage = new SearchPage(this.page!);
    await searchPage.verifyProductPriceAtLeast(minPrice);
});
