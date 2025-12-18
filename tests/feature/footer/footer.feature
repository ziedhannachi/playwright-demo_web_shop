@footer
Feature: Footer validation on Demo Web Shop

  Background:
    Given I navigate to webShop website

  Scenario: Verify all footer links exist
    Then I verify the About Us link in footer exists
    Then I verify the Sitemap link in footer exists
    Then I verify the Privacy Notice link in footer exists
    Then I verify the Contact Us link in footer exists

  Scenario: Subscribe to newsletter from footer
    When I subscribe to the newsletter with email "testuser@example.com"
    Then I should see a newsletter subscription confirmation
