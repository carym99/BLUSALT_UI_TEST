const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const { SampleAppPage } = require('../../pages/SampleAppPage');

const sampleAppPage = new SampleAppPage();

Given('I am on the Sample App page', () => {
  sampleAppPage.open();
});

When('I log in with username {string} and password {string}', (username, password) => {
  sampleAppPage.login(username, password);
});

Then('I should see a welcome message for {string}', (username) => {
  sampleAppPage.verifyWelcomeMessage(username);
});

Then('I should see an invalid credentials message', () => {
  cy.get(sampleAppPage.loginStatus)
    .should('have.class', 'text-danger')
    .and('contain.text', 'Invalid username/password');
});
