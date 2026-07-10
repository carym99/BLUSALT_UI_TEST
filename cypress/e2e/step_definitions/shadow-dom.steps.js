const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const { ShadowDomPage } = require('../../pages/ShadowDomPage');

const shadowDomPage = new ShadowDomPage();

Given('I am on the Shadow DOM page', () => {
  shadowDomPage.open();
});

Given('clipboard permissions are granted', () => {
  shadowDomPage.grantClipboardAccess();
});

When('I generate a new GUID', () => {
  shadowDomPage.generateGuid();
});

When('I copy the GUID to the clipboard', () => {
  shadowDomPage.copyGuidToClipboard();
});

Then('the clipboard value should match the input field value', () => {
  shadowDomPage.verifyClipboardMatchesInput();
});
