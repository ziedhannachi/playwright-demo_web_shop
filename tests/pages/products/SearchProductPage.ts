import { Page, expect } from '@playwright/test';
import BaseAction from '../../utils/basePage';
import { SEARCH_LOCATORS } from '../../locators/products/SearchProductLocators';

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
        await this.page.waitForSelector(SEARCH_LOCATORS.productAllItem);
        const titles = await this.page.$$eval(
            SEARCH_LOCATORS.productTitle,
            els => els.map(el => el.textContent?.trim() || '')
        );
        return titles;
    }

    public async getAllProductPrices(): Promise<number[]> {
        await this.page.waitForSelector(SEARCH_LOCATORS.productAllItem);
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

    /**
     * Click on product picture
     */
    async clickOnFirstProductPicture() {
        await this.page.waitForSelector(SEARCH_LOCATORS.productPicture);
        await this.page.locator(SEARCH_LOCATORS.productPicture).first().click();
    }

    /**
     * Get all products with prices
     */
    async getProductsWithPrices() {
        await this.page.waitForSelector(SEARCH_LOCATORS.productItem);

        const products = this.page.locator(SEARCH_LOCATORS.productItem);
        const count = await products.count();

        const result: { index: number; price: number }[] = [];

        for (let i = 0; i < count; i++) {
            const priceText = await products
                .nth(i)
                .locator(SEARCH_LOCATORS.productPrice)
                .textContent();

            const price = parseFloat(
                priceText?.replace(/[^0-9.]/g, '') || '0'
            );

            result.push({ index: i, price });
        }

        return result;
    }

    /**
     * Add cheapest product to cart
     */
    async addCheapestProductToCart(): Promise<number> {
        const productItems = this.page.locator(SEARCH_LOCATORS.productItem);
        await productItems.first().waitFor({ state: 'visible', timeout: 5000 });

        const count = await productItems.count();
        if (count === 0) throw new Error('No products found');

        let cheapestPrice = Infinity;
        let cheapestIndex = 0;

        for (let i = 0; i < count; i++) {
            const product = productItems.nth(i);
            const priceElements = product.locator('div.prices span');

            const priceCount = await priceElements.count();
            for (let j = 0; j < priceCount; j++) {
                const text = await priceElements.nth(j).textContent();
                if (!text) continue;
                const price = parseFloat(text.replace(/[^0-9.]/g, ''));
                if (price < cheapestPrice) {
                    cheapestPrice = price;
                    cheapestIndex = i;
                }
            }
        }

        console.log('Cheapest product index:', cheapestIndex, 'price:', cheapestPrice);
        const cheapestProduct = productItems.nth(cheapestIndex);
        const addButton = cheapestProduct.locator('input[value="Add to cart"]').first();
        await addButton.click();

        const confirmationMessage = this.page.locator('div.bar-notification.success').first();
        await confirmationMessage.waitFor({ state: 'visible', timeout: 3000 });
        const messageText = await confirmationMessage.textContent();
        console.log('Confirmation message:', messageText);
        expect(messageText).toContain('The product has been added to your shopping cart');

        return cheapestPrice;
    }

    /**
     * Verify success message
     */
    async verifyAddToCartSuccessMessage() {
        const message = await this.page
            .locator(SEARCH_LOCATORS.successMessage)
            .textContent();

        expect(message).toContain(
            'The product has been added to your shopping cart'
        );
    }

    async openShoppingCart() {
        await this.clickElements(SEARCH_LOCATORS.shoppingCartLink);
    }

    async verifyProductInCart(expectedName: string) {
        const productName = await this.getText(SEARCH_LOCATORS.cartProductName);
        expect(productName?.toLowerCase()).toContain(expectedName.toLowerCase());
    }
}
