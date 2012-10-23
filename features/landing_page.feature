Feature: Have Get All Weeks on the landing page 
  As a user of V4
  I want to have a link that directs me to the Get-All-Weeks page
  So that I can see a list of all available weeks.

  Scenario: Landing Page
    Given I am on the V4 app landing webpage
    Then I should see "Get all weeks" as the "1" link with ref to "/get/all/weeks"
    And I should see "Week Graph" as the "2" link with ref to "/graph/weeks"
