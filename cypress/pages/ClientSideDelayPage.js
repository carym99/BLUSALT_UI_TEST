const { BasePage } = require('./BasePage');

class ClientSideDelayPage extends BasePage {
  constructor() {
    super();
    this.path = '/clientdelay';
    this.triggerButton = '#ajaxButton';
    this.processedLabel = '.bg-success';
    this.expectedLabelText = 'Data calculated on the client side.';
  }

  open() {
    return this.visit(this.path);
  }

  triggerClientSideProcessing() {
    cy.get(this.triggerButton).click();
    return this;
  }

  waitForProcessedLabel() {
    cy.get(this.processedLabel, { timeout: 20000 })
      .should('be.visible')
      .and('contain.text', this.expectedLabelText);
    return this;
  }

  clickProcessedLabel() {
    cy.get(this.processedLabel).contains(this.expectedLabelText).click();
    return this;
  }
}

module.exports = { ClientSideDelayPage };
