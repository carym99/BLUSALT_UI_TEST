const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const { ClientSideDelayPage } = require('../../pages/ClientSideDelayPage');

const page = new ClientSideDelayPage();

Given('I am on the Client Side Delay page', () => {
  page.open();
});

When('I trigger the client-side processing button', () => {
  page.triggerClientSideProcessing();
});

When('I wait for the processed data label to appear', () => {
  page.waitForProcessedLabel();
});

Then('I click the processed label text', () => {
  page.clickProcessedLabel();
});
