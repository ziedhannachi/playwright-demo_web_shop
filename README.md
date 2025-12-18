# 🛒 Demo Web Shop - E2E Automation Project

[![Build Status](https://img.shields.io/github/actions/workflow/status/your-username/webshop-e2e/ci.yml?branch=main&style=flat-square&color=green)](https://github.com/your-username/webshop-e2e/actions)
[![Cucumber Reports](https://img.shields.io/badge/Cucumber-Reports-blue?style=flat-square)](tests/reports/report.html)
[![Playwright](https://img.shields.io/badge/Playwright-v1.40.0-brightgreen?style=flat-square)](https://playwright.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-v5.0-blue?style=flat-square)](https://www.typescriptlang.org/)

---

## 🎯 Project Overview

This project is an **End-to-End Automation Framework** for the **Demo Web Shop** website using:

- **Playwright**: Browser automation
- **Cucumber**: BDD with `.feature` files
- **TypeScript**: Strongly typed language
- **Page Object Model (POM)**: Clean test architecture
- **CustomWorld**: Context for passing data between steps

It covers **login, registration, product search, shopping cart, checkout, header/footer validation**, and more.

---

## 🏗️ Architecture

```text
tests/
├── constants/
│   └── Const.ts             # Global constants (e.g., emails)
├── features/
│   ├── authentication/
│   │   ├── login-register.feature
│   │   └── login-negative.feature
│   ├── catalog/
│   │   └── product-search.feature
│   ├── cart/
│   │   └── shopping-cart-management.feature
│   ├── checkout/
│   │   └── checkout-process.feature
│   ├── wishlist/
│   │   └── wishlist-management.feature
│   └── ui/
│       ├── header-navigation.feature
│       └── footer-links.feature
├── locators/
│   ├── AuthLocators.ts
│   ├── LoginLocators.ts
│   ├── ComputersLocators.ts
│   ├── FooterLocators.ts
│   └── HeaderLocators.ts
├── pages/
│   ├── BasePage.ts
│   ├── LoginShopPage.ts
│   ├── RegisterPage.ts
│   ├── ComputersPage.ts
│   ├── FooterPage.ts
│   └── HeaderPage.ts
├── steps/
│   ├── auth/
│   │   └── LoginRegisterSteps.ts
│   ├── cart/
│   │   └── ComputersStep.ts
│   ├── header/
│   │   └── HeaderSteps.ts
│   └── footer/
│       └── FooterSteps.ts
├── utils/
│   ├── basePage.ts
│   └── custom-world.ts
└── cucumber.mjs             # Cucumber configuration

```
---

## ⚙️ Installation

# Clone the repository

git clone https://github.com/ziedhannachi/playwright-demo_web_shop.git

- Install dependencies
  - npm init -y
  - npm install --save-dev @playwright/test
  - npx playwright install

- Installer Cucumber avec TypeScript
  - npm install --save-dev @cucumber/cucumber ts-node typescript

 - Installer types Node.js
   - npm install --save-dev @types/node

## 🚀 Usage
- Run all tests
- npx cucumber-js
- Run tests by tag
# Run smoke tests
 - npx cucumber-js --tags "@smoke"

# Run e2e tests
 - npx cucumber-js --tags "@e2e"

 - Generate Reports

- Reports are automatically generated in:

  - tests/reports/report.html
  - tests/reports/report.json


- Open HTML report in your browser:

  - open tests/reports/report.html

## 📂 Page Object Model (POM)

- Each page has a Page Object class:

   - Encapsulates locators and actions

  - Example: LoginShopPage.ts handles login inputs & buttons

- Steps files call these Page Objects, keeping features clean & readable.

## 🧪 Features

- Authentication

  - Login (success & failure)

  - Register

- Catalog

  - Search products

  - Browse categories

- Shopping Cart

  - Add / remove products

  - Update quantities

- Checkout

  - Complete checkout

  - Validate terms acceptance

- Wishlist

  - Add / remove products

- UI Validation

  - Header elements & menus

  - Footer links & newsletter subscription

## 🔧 Utilities

 - BaseAction.ts → Generic actions (clickElements, fillText, getText, waitFor)

 - Random data generators:

   - generateRandomEmail()

    - generateRandomFirstName()

   - generateRandomLastName()

- CustomWorld → Share data between steps (email, product name, etc.)

## 🏷️ Tags & Test Organization

- @e2e → Full end-to-end tests

- @smoke → Quick critical flows

- @regression → Full regression suite

- @negative → Invalid/negative test cases

## 📊 Reporting & Badges

- GitHub Actions CI integration ✅

- Playwright reports (video, screenshot) 📹

- Cucumber HTML / JSON reports 📄

- GitHub badges for build status, framework versions, and reports

## 🌟 Recommended Workflow

1. Run smoke tests locally before push

2. Push feature branch → triggers CI

3. Check HTML report for failures

4. Add new locators / page objects for new features

5. Keep features & steps clean

## 💡 Tips

- Use random data generators for registration and unique emails

- Always reuse Page Objects in steps

- Keep selectors in locators/ to centralize changes

- Tag features for CI filtering (@smoke, @e2e, @regression)

## 🔗 Useful Links

- [Playwright Docs](https://playwright.dev/)

- [Cucumber Docs](https://cucumber.io/docs/guides/10-minute-tutorial/)

- [TypeScript Docs](https://www.typescriptlang.org/)

- [Demo Web Shop](https://demowebshop.tricentis.com/)


---
