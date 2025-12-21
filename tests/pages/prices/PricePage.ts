import { Page, expect } from '@playwright/test';
import BaseAction from '../../utils/basePage';
import { PRICE_LOCATORS } from '../../locators/prices/PriceLocators';

export class PricePage extends BaseAction {
    constructor(page: Page) {
        super(page);
    }

    public async getAllPrices(itemSelector: string): Promise<number[]> {
        await this.page.waitForSelector(itemSelector);
        const prices = await this.page.$$eval(
            `${itemSelector} ${PRICE_LOCATORS.price}`,
            els => els.map(el => {
                const text = el.textContent?.trim() || '';
                return parseFloat(text.replace(/[^0-9.]/g, ''));
            })
        );
        return prices;
    }

    public getMinPrice(prices: number[]): number {
        return Math.min(...prices);
    }

    public getMaxPrice(prices: number[]): number {
        return Math.max(...prices);
    }

    public async addProductToCart(itemSelector: string, targetPrice: number) {
        const pageLocator = this.page.locator(itemSelector); // Locator sur tous les items
        const count = await pageLocator.count();

        for (let i = 0; i < count; i++) {
            const item = pageLocator.nth(i);
            const priceText = await item.locator(PRICE_LOCATORS.price).textContent();
            const price = parseFloat(priceText?.replace(/[^0-9.]/g, '') || '0');

            if (price === targetPrice) {
                await item.locator(PRICE_LOCATORS.addToCartBtn).click();
                break;
            }
        }
    }


    public async openCart() {
        await this.clickElements(PRICE_LOCATORS.shoppingCartLink);
    }

    public async verifyPriceInCart(expectedPrice: number) {

        function sleep(ms: number) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        await sleep(3000);
        const priceText = await this.getText('tr:has-text("Total") strong'); // locator unique
        if (!priceText) throw new Error('Price element not found in cart');

        const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
        console.log('Price in cart:', price, 'Expected price:', expectedPrice);

        if (expectedPrice === 0) throw new Error('Expected price not set. Check previous step.');

        expect(price).toBe(expectedPrice);
    }
}