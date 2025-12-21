@e2e @cart1
Feature: Verify desktop price in cart

  Background:
    Given I navigate to webShop website
    When I click on the Log in link
    When I enter valid credentials
      | email    | {userEmail} |
      | password | $Z4J2ra!U98h! |
    And I click on the Log in button
    Then I verify that I am redirected to the homepage with email '{userEmail}'

  Scenario: Add the cheapest desktop to cart and verify price
    When I navigate to Computers module
    And I go to Desktops
    Then I collect the prices of all displayed desktops
    And I select the cheapest desktop priceN
    And I add the cheapest desktop to the shopping cartN
    Then I verify the price in the cart matches the selected priceN

