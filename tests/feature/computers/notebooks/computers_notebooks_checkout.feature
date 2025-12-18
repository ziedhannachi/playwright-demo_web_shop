@notebooks
Feature: Computers / Notebooks / Add to Cart / Checkout

  Background:
    Given I navigate to webShop website
    When I click on the Log in link
    When I enter valid credentials
      | email    | {userEmail} |
      | password | $Z4J2ra!U98h! |
    And I click on the Log in button
    Then I verify that I am redirected to the homepage with email '{userEmail}'

  Scenario: Add first notebook to cart and checkout
    When I navigate to Computers module
    And I go to Notebooks
    And I add the first notebook to cart
    And I navigate to shopping cart
    And I click on terms of service
    And I proceed to checkout
    And I complete the checkout process
    Then I should see the order confirmation
