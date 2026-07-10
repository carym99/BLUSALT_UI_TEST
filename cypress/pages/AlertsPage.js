const { BasePage } = require('./BasePage');

class AlertsPage extends BasePage {
  constructor() {
    super();
    this.path = '/alerts';
    this.alertButton = '#alertButton';
    this.confirmButton = '#confirmButton';
    this.promptButton = '#promptButton';
  }

  open() {
    return this.visit(this.path);
  }

  clickAlert() {
    cy.get(this.alertButton).click();
    return this;
  }

  clickConfirm() {
    cy.get(this.confirmButton).click();
    return this;
  }

  clickPrompt() {
    cy.get(this.promptButton).click();
    return this;
  }

  handleAlertDialog() {
    cy.on('window:alert', (text) => {
      expect(text).to.contain('Today is a working day');
    });
    return this;
  }

  handleConfirmDialog() {
    cy.on('window:confirm', (text) => {
      expect(text).to.contain('Today is Friday');
      return true;
    });
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Yes');
    });
    return this;
  }

  handlePromptDialog(answer = 'dogs') {
    cy.on('window:prompt', (text, defaultValue) => {
      expect(text).to.contain('cats');
      expect(defaultValue).to.equal('cats');
      return answer;
    });
    cy.on('window:alert', (text) => {
      expect(text).to.equal(`User value: ${answer}`);
    });
    return this;
  }
}

module.exports = { AlertsPage };
