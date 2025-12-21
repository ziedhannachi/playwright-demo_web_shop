@e2e @search @cart
Feature: Product search and price validation on Demo Web Shop

  Background:
    Given I navigate to webShop website
    When I click on the Log in link
    When I enter valid credentials
      | email    | {userEmail} |
      | password | $Z4J2ra!U98h! |
    And I click on the Log in button
    Then I verify that I am redirected to the homepage with email '{userEmail}'

  # ----------------------------
  # POSITIVE SEARCH
  # ----------------------------
  Scenario: Search product and verify minimum price
    When I search for the product "digital SLR Camera"
    Then search results should be displayed
    And the first product price should be at least 500

  # ----------------------------
  # NEGATIVE SEARCH
  # ----------------------------
  Scenario: Search for a nonexistent product
    When I search for the product "xyz-not-existing-product"
    Then no product should be displayed

  # ----------------------------
  # SORT BY PRICE
  # ----------------------------
  Scenario: Search product and sort by lowest price
    When I search for the product "camera"
    And I sort products by price from low to high
    Then the first product price should be at least 500

  # ----------------------------
  # QUANTITY > 1
  # ----------------------------
  Scenario: Add product with quantity greater than one
    When I search for the product "camera"
    And I add the first product to the cart
    And I update the cart quantity to 3
    Then the cart total price should be at least 1500
