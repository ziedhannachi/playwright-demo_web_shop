@product

Feature: Login
    Background:
    Given I navigate to webShop website
    When I click on the Log in link
    When I enter valid credentials
      | email    | {userEmail} |
      | password | $Z4J2ra!U98h! |
    And I click on the Log in button
    Then I verify that I am redirected to the homepage with email '{userEmail}'

  @login_valid
  Scenario: I search un article from the filter
    When I complete the field with "digital SLR Camera"
    And I click on the button "Search"
    Then The article should display 
    And  The product price should be at least 500 
    