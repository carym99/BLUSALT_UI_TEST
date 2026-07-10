Feature: Shadow DOM
  As a test automation engineer
  I want to interact with elements inside a Shadow DOM
  So that I can generate and copy a GUID to the clipboard

  Scenario: Generate GUID and verify clipboard matches input field
    Given I am on the Shadow DOM page
    And clipboard permissions are granted
    When I generate a new GUID
    And I copy the GUID to the clipboard
    Then the clipboard value should match the input field value
