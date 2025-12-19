export const COMPUTER_LOCATORS = {
  computersMenu: '//ul[@class="top-menu"]//a[normalize-space()="Computers"]',
  desktopsSubmenu: '//ul[@class="top-menu"]//a[normalize-space()="Desktops"]',
  firstProductAddToCart: '//body[1]/div[4]/div[1]/div[4]/div[2]/div[2]/div[2]/div[3]/div[1]/div[1]/div[2]/div[3]/div[2]/input[1]',
  shoppingCartLink: 'a[href="/cart"]',
  cartItemName: '//h1[normalize-space()="Build your own cheap computer"]',

  notebooksSubmenu: '//ul[@class="top-menu"]//a[normalize-space()="Notebooks"]',
  firstNotebookAddToCart: '(//input[@value="Add to cart"])[1]',
  termsOfService: '#termsofservice',
  checkoutButton: 'button#checkout',
  billingSave:'//input[@onclick="Billing.save()"]',
  shippingSave:'//input[@onclick="Shipping.save()"]',
  shippingMethod: '//input[@class="button-1 shipping-method-next-step-button"]',
  paymentMethod: '//input[@class="button-1 payment-method-next-step-button"]',
  paymentInfoContinueBtn: '//input[@class="button-1 payment-info-next-step-button"]',
  confirmOrderBtn: '//input[@value="Confirm"]',
  orderConfirmation: '//strong[normalize-space()="Your order has been successfully processed!"]',

  desktopItems: 'div.item-box',
  desktopPrice: '.prices .price',
  
};
