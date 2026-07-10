const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const { DynamicTablePage } = require('../../pages/DynamicTablePage');

const dynamicTablePage = new DynamicTablePage();

Given('I am on the Dynamic Table page', () => {
  dynamicTablePage.open();
});

When('I read the Chrome CPU value from the table', () => {
  dynamicTablePage.getChromeCpuFromTable().as('tableCpu');
});

Then('the Chrome CPU label should display the same value', () => {
  cy.get('@tableCpu').then((tableCpu) => {
    dynamicTablePage.getChromeCpuFromLabel().should('equal', tableCpu);
  });
});
