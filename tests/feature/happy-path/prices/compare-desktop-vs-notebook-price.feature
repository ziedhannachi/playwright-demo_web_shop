@e2e @pricing1
Feature: Compare notebook prices

  Background:
    Given I navigate to webShop website
    When I click on the Log in link
    When I enter valid credentials
      | email    | {userEmail} |
      | password | $Z4J2ra!U98h! |
    And I click on the Log in button
    Then I verify that I am redirected to the homepage with email '{userEmail}'

  Scenario: Find the most expensive notebook
    When I navigate to Computers module
    And I go to Notebooks
    Then I collect the prices of all displayed notebooks
    And I select the most expensive notebook price
