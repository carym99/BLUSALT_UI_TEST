Feature: Sample App

  Scenario: Login with valid credentials
    Given I am on the Sample App page
    When I log in with username "testuser" and password "pwd"
    Then I see a welcome message for "testuser"

  Scenario: Login with wrong password
    Given I am on the Sample App page
    When I log in with username "testuser" and password "wrong"
    Then I see an invalid credentials message
