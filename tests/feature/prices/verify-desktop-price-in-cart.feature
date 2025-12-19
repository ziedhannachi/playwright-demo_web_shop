@e2e @comparison1
Feature: Compare max price between Desktop and Notebook

  Background:
    Given I navigate to webShop website
    When I click on the Log in link
    When I enter valid credentials
      | email    | {userEmail} |
      | password | $Z4J2ra!U98h! |
    And I click on the Log in button
    Then I verify that I am redirected to the homepage with email '{userEmail}'

  Scenario: Determine which category has the most expensive product
    When I navigate to Computers module
    And I go to Desktops
    Then I collect the prices of all displayed desktops
    And I select the most expensive desktop price
     When I navigate to Computers module
    When I go to Notebooks
    Then I collect the prices of all displayed notebooks
    And I select the most expensive notebook price
    Then I compare the maximum prices between Desktop and Notebook
