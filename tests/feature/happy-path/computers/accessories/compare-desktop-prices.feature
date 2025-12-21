@e2e @pricing
Feature: Compare prices between PC (Desktops) on Demo Web Shop

  Background:
    Given I navigate to webShop website
    When I click on the Log in link
    When I enter valid credentials
      | email    | {userEmail} |
      | password | $Z4J2ra!U98h! |
    And I click on the Log in button
    Then I verify that I am redirected to the homepage with email '{userEmail}'

  Scenario: Compare prices of desktops
    When I navigate to Computers module
    And I go to Desktops
    Then I collect the prices of all displayed desktops
    And I verify that desktop prices can be compared
    Then I select the cheapest desktop price for desktop
