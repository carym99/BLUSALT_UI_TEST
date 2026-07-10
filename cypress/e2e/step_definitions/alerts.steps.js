const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const { AlertsPage } = require('../../pages/AlertsPage');

const alertsPage = new AlertsPage();

Given('I am on the Alerts page', () => {
  alertsPage.open();
});

When('I click the Alert button and accept the dialog', () => {
  alertsPage.handleAlertDialog();
  alertsPage.clickAlert();
});

Then('the alert dialog should be handled successfully', () => {
  cy.log('Alert dialog handled without manual intervention');
});

When('I click the Confirm button and accept the dialog', () => {
  alertsPage.handleConfirmDialog();
  alertsPage.clickConfirm();
});

Then('the confirmation result should be handled successfully', () => {
  cy.log('Confirm dialog handled without manual intervention');
});

When('I click the Prompt button and answer with {string}', (answer) => {
  alertsPage.handlePromptDialog(answer);
  alertsPage.clickPrompt();
});

Then('the prompt result should be handled successfully', () => {
  cy.log('Prompt dialog handled without manual intervention');
});
