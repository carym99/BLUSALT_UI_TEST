const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const { ShadowDomPage } = require('../../pages/ShadowDomPage');

const page = new ShadowDomPage();

Given('I am on the Shadow DOM page', () => {
  page.open();
});

Given('clipboard permissions are granted', () => {
  page.grantClipboardAccess();
});

When('I generate a new GUID', () => {
  page.generateGuid();
});

When('I copy the GUID to the clipboard', () => {
  page.copyGuidToClipboard();
});

Then('the clipboard matches the input field', () => {
  page.verifyClipboardMatchesInput();
});
