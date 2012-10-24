Feature: Get All Weeks should show query links from all available links in the database
  As a user of V4
  I want to have a query link to every week available in the database
  So that I can query each week separately 

  Scenario: Show query links according to weeks in database
    Given I am on the Get All Weeks page
    Then I should see as many query links as weeks are in the database

