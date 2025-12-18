@e2e @auth
Feature: User registration and login on webShop website

  Background:
    Given I navigate to webShop website
    When I click on the Log in link

  Scenario: Register a new user and login successfully
    When I click on Register link
    And I fill the registration form with valid data
    Then I should see registration success message
