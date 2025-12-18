@header
Feature: Header validation on webShop website

  Background:
    Given I navigate to webShop website

  Scenario: Verify header elements and navigation menu
    Then I verify the header is displayed
    And I verify header navigation links
    And I verify header main menu items
