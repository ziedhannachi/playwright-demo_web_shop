@product1
Feature: Add product to cart from search

  Background:
    Given I navigate to webShop website
    When I click on the Log in link
    When I enter valid credentials
      | email    | {userEmail} |
      | password | $Z4J2ra!U98h! |
    And I click on the Log in button
    Then I verify that I am redirected to the homepage with email '{userEmail}'

  Scenario: Search a product and add it to the cart
    When I complete the field with "digital SLR Camera"
    And I click on the button "Search"
    And I add the first searched product to the cart
    Then The product should be visible in the shopping cart
