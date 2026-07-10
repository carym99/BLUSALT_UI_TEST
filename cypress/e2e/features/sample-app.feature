Feature: Sample App
  As a test automation engineer
  I want to log in to the sample application
  So that I can verify authentication with dynamic element attributes

  Scenario: Successful login with valid credentials
    Given I am on the Sample App page
    When I log in with username "testuser" and password "pwd"
    Then I should see a welcome message for "testuser"

  Scenario: Failed login with invalid credentials
    Given I am on the Sample App page
    When I log in with username "testuser" and password "wrong"
    Then I should see an invalid credentials message
