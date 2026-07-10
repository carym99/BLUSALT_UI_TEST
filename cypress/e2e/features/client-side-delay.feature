Feature: Client Side Delay
  As a test automation engineer
  I want to wait for client-side processing to complete
  So that I can interact with dynamically rendered elements

  Scenario: Wait for label after client-side delay and click it
    Given I am on the Client Side Delay page
    When I trigger the client-side processing button
    And I wait for the processed data label to appear
    Then I should be able to click the processed label text
