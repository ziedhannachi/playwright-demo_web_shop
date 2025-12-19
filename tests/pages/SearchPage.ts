import { Page, expect } from '@playwright/test';
import BaseAction from '../utils/basePage';
import { SEARCH_LOCATORS } from '../locators/SearchLocators';

export class SearchPage extends BaseAction {
    constructor(page: Page) {
        super(page);
    }

    public async fillSearchField(keyword: string) {
        await this.fillText(SEARCH_LOCATORS.searchInput, keyword);
    }

    public async clickSearchButton() {
        await this.clickElements(SEARCH_LOCATORS.searchButton);
    }

    public async getAllProductTitles(): Promise<string[]> {
        await this.page.waitForSelector(SEARCH_LOCATORS.productItem);
        const titles = await this.page.$$eval(
            SEARCH_LOCATORS.productTitle,
            els => els.map(el => el.textContent?.trim() || '')
        );
        return titles;
    }

    public async getAllProductPrices(): Promise<number[]> {
        await this.page.waitForSelector(SEARCH_LOCATORS.productItem);
        const prices = await this.page.$$eval(
            SEARCH_LOCATORS.productPrice,
            els => els.map(el => {
                const text = el.textContent?.trim() || '';
                return parseFloat(text.replace(/[^0-9.]/g, ''));
            })
        );
        return prices;
    }

    public async verifyProductExists(expectedKeyword: string) {
        const titles = await this.getAllProductTitles();
        const exists = titles.some(title => title.toLowerCase().includes(expectedKeyword.toLowerCase()));
        expect(exists).toBeTruthy();
    }

    public async verifyProductPriceAtLeast(minPrice: number) {
        const prices = await this.getAllProductPrices();
        const valid = prices.some(price => price >= minPrice);
        console.log('Product prices:', prices);
        expect(valid).toBeTruthy();
    }
}
