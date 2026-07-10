Feature: Dynamic Table
  As a test automation engineer
  I want to verify values in a dynamic table
  So that I can validate data regardless of column order

  Scenario: Compare Chrome CPU value in table with the yellow label
    Given I am on the Dynamic Table page
    When I read the Chrome CPU value from the table
    Then the Chrome CPU label should display the same value
