Feature: Shadow DOM

  Scenario: Copy GUID to clipboard and verify it matches the input
    Given I am on the Shadow DOM page
    And clipboard permissions are granted
    When I generate a new GUID
    And I copy the GUID to the clipboard
    Then the clipboard matches the input field
