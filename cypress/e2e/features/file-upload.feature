Feature: File Upload

  Scenario: Upload via drag and drop
    Given I am on the File Upload page
    When I upload a file by drag and drop
    Then the file appears in the upload list

  Scenario: Upload via browse button
    Given I am on the File Upload page
    When I upload a file using browse
    Then the file appears in the upload list
