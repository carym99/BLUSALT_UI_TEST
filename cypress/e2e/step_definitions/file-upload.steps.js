const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const { FileUploadPage } = require('../../pages/FileUploadPage');

const page = new FileUploadPage();

Given('I am on the File Upload page', () => {
  page.open();
});

When('I upload a file by drag and drop', () => {
  page.uploadViaDragAndDrop();
});

When('I upload a file using browse', () => {
  page.uploadViaBrowseButton();
});

Then('the file appears in the upload list', () => {
  page.verifyFileUploaded();
});
