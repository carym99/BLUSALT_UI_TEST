Feature: Alerts
  As a test automation engineer
  I want to handle browser dialogs automatically
  So that tests run without manual intervention

  Scenario: Handle alert dialog
    Given I am on the Alerts page
    When I click the Alert button and accept the dialog
    Then the alert dialog should be handled successfully

  Scenario: Handle confirm dialog
    Given I am on the Alerts page
    When I click the Confirm button and accept the dialog
    Then the confirmation result should be handled successfully

  Scenario: Handle prompt dialog with a custom answer
    Given I am on the Alerts page
    When I click the Prompt button and answer with "dogs"
    Then the prompt result should be handled successfully
