@e2e @search
Feature: Product search on webShop website

  Background:
    Given I navigate to webShop website

  Scenario: Search for a product by keyword
    When I search for "computer"
    Then I should see search results containing "computer"

  Scenario: Search for a non-existent product
    When I search for "invalidproduct123"
    Then I should see "No products were found" message

