Feature: Dynamic Table

  Scenario: Chrome CPU in the table matches the yellow label
    Given I am on the Dynamic Table page
    When I read the Chrome CPU value from the table
    Then the Chrome CPU label should show the same value
