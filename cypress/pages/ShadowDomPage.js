const { BasePage } = require('./BasePage');

class ShadowDomPage extends BasePage {
  constructor() {
    super();
    this.path = '/shadowdom';
    this.guidGenerator = 'guid-generator';
    this.generateButton = '#buttonGenerate';
    this.copyButton = '#buttonCopy';
    this.guidInput = '#editField';
  }

  open() {
    return this.visit(this.path);
  }

  grantClipboardAccess() {
    cy.grantClipboardPermissions();
    return this;
  }

  generateGuid() {
    cy.get(this.guidGenerator).shadow().find(this.generateButton).click();
    return this;
  }

  copyGuidToClipboard() {
    cy.get(this.guidGenerator).shadow().find(this.copyButton).click();
    return this;
  }

  getGuidInputValue() {
    return cy
      .get(this.guidGenerator)
      .shadow()
      .find(this.guidInput)
      .invoke('val');
  }

  verifyClipboardMatchesInput() {
    this.getGuidInputValue().then((inputValue) => {
      cy.window().then((win) => {
        return win.navigator.clipboard.readText();
      }).should('equal', inputValue);
    });
    return this;
  }
}

module.exports = { ShadowDomPage };
