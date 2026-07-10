const { Given, When } = require('@badeball/cypress-cucumber-preprocessor');
const { AlertsPage } = require('../../pages/AlertsPage');

const page = new AlertsPage();

Given('I am on the Alerts page', () => {
  page.open();
});

When('I accept the alert dialog', () => {
  page.handleAlertDialog();
  page.clickAlert();
});

When('I accept the confirm dialog', () => {
  page.handleConfirmDialog();
  page.clickConfirm();
});

When('I answer the prompt with {string}', (answer) => {
  page.handlePromptDialog(answer);
  page.clickPrompt();
});
