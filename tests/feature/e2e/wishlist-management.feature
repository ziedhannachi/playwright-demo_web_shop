@e2e @wishlist
Feature: Wishlist management on webShop website

  Background:
    Given I navigate to webShop website
    And I login with valid credentials

  Scenario: Add product to wishlist
    When I add "Build your own computer" to wishlist
    Then I should see "Build your own computer" in wishlist

  Scenario: Remove product from wishlist
    Given "Build your own computer" is in wishlist
    When I remove "Build your own computer" from wishlist
    Then wishlist should be empty
