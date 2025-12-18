@computers
Feature: Computers module

  Background:
    Given I navigate to webShop website
    When I click on the Log in link
    When I enter valid credentials
      | email    | {userEmail} |
      | password | $Z4J2ra!U98h! |
    And I click on the Log in button
    Then I verify that I am redirected to the homepage with email '{userEmail}'

  Scenario: Add first Desktop product to cart
    When I navigate to Computers module
    And I go to Desktops
    And I add the first product to cart
    And I navigate to shopping cart
    Then I should see the product 'Build your own cheap computer' in cart
