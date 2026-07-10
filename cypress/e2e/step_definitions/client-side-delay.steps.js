const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const { ClientSideDelayPage } = require('../../pages/ClientSideDelayPage');

const clientSideDelayPage = new ClientSideDelayPage();

Given('I am on the Client Side Delay page', () => {
  clientSideDelayPage.open();
});

When('I trigger the client-side processing button', () => {
  clientSideDelayPage.triggerClientSideProcessing();
});

When('I wait for the processed data label to appear', () => {
  clientSideDelayPage.waitForProcessedLabel();
});

Then('I should be able to click the processed label text', () => {
  clientSideDelayPage.clickProcessedLabel();
});
