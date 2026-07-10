const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const { DynamicTablePage } = require('../../pages/DynamicTablePage');

const page = new DynamicTablePage();

Given('I am on the Dynamic Table page', () => {
  page.open();
});

When('I read the Chrome CPU value from the table', () => {
  page.getChromeCpuFromTable().as('tableCpu');
});

Then('the Chrome CPU label should show the same value', () => {
  cy.get('@tableCpu').then((tableCpu) => {
    page.getChromeCpuFromLabel().should('equal', tableCpu);
  });
});
