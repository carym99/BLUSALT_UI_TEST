Feature: Client Side Delay

  Scenario: Wait for the label and click it
    Given I am on the Client Side Delay page
    When I trigger the client-side processing button
    And I wait for the processed data label to appear
    Then I click the processed label text
