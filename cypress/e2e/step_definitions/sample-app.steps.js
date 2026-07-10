const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const { SampleAppPage } = require('../../pages/SampleAppPage');

const page = new SampleAppPage();

Given('I am on the Sample App page', () => {
  page.open();
});

When('I log in with username {string} and password {string}', (username, password) => {
  page.login(username, password);
});

Then('I see a welcome message for {string}', (username) => {
  page.verifyWelcomeMessage(username);
});

Then('I see an invalid credentials message', () => {
  page.verifyInvalidCredentials();
});
