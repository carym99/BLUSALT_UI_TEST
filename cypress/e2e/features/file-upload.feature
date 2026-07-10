Feature: File Upload
  As a test automation engineer
  I want to upload files through different methods
  So that I can verify drag-and-drop and browse upload flows

  Scenario: Upload a file via drag and drop
    Given I am on the File Upload page
    When I upload a file using drag and drop
    Then the uploaded file should be listed successfully

  Scenario: Upload a file using the browse button
    Given I am on the File Upload page
    When I upload a file using the browse files input
    Then the uploaded file should be listed successfully
