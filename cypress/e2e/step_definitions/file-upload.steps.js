const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const { FileUploadPage } = require('../../pages/FileUploadPage');

const fileUploadPage = new FileUploadPage();

Given('I am on the File Upload page', () => {
  fileUploadPage.open();
});

When('I upload a file using drag and drop', () => {
  fileUploadPage.uploadViaDragAndDrop();
});

When('I upload a file using the browse files input', () => {
  fileUploadPage.uploadViaBrowseButton();
});

Then('the uploaded file should be listed successfully', () => {
  fileUploadPage.verifyFileUploaded();
});
