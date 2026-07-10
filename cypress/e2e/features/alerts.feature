Feature: Alerts

  Scenario: Accept an alert
    Given I am on the Alerts page
    When I accept the alert dialog

  Scenario: Accept a confirmation
    Given I am on the Alerts page
    When I accept the confirm dialog

  Scenario: Answer a prompt with a custom value
    Given I am on the Alerts page
    When I answer the prompt with "dogs"
