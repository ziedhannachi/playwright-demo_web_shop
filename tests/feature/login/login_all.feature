@login
Feature: Login scenarios in webShop website

  Background:
    Given I navigate to webShop website
    When I click on the Log in link

  @success
  Scenario: Successful login with valid credentials
    When I enter valid credentials
      | email    | {userEmail} |
      | password | $Z4J2ra!U98h! |
    And I click on the Log in button
    Then I verify that I am redirected to the homepage with email '{userEmail}'

  @failure
  Scenario: Login with invalid credentials
    When I enter valid credentials
      | email    | fakeuser@mail.com |
      | password | wrongPassword     |
    And I click on the Log in button
    Then I verify login error message is displayed

  @navigate
  Scenario: Login and access Shoes category
    When I enter valid credentials
      | email    | {userEmail} |
      | password | $Z4J2ra!U98h! |
    And I click on the Log in button
    Then I verify that I am redirected to the homepage with email '{userEmail}'
    When I click on Shoes category
    Then I verify that Shoes page is displayed
