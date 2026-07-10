const { BasePage } = require('./BasePage');

class SampleAppPage extends BasePage {
  constructor() {
    super();
    this.path = '/sampleapp';
    this.usernameInput = 'input[placeholder="User Name"]';
    this.passwordInput = 'input[type="password"]';
    this.loginButton = '#login';
    this.loginStatus = '#loginstatus';
  }

  open() {
    return this.visit(this.path);
  }

  enterUsername(username) {
    cy.get(this.usernameInput).clear().type(username);
    return this;
  }

  enterPassword(password) {
    cy.get(this.passwordInput).clear().type(password);
    return this;
  }

  clickLogin() {
    cy.get(this.loginButton).click();
    return this;
  }

  login(username, password) {
    this.enterUsername(username);
    this.enterPassword(password);
    this.clickLogin();
    return this;
  }

  verifyWelcomeMessage(username) {
    cy.get(this.loginStatus)
      .should('have.class', 'text-success')
      .and('contain.text', `Welcome, ${username}!`);
    return this;
  }

  verifyLoggedOut() {
    cy.get(this.loginStatus)
      .should('have.class', 'text-info')
      .and('contain.text', 'User logged out.');
    return this;
  }
}

module.exports = { SampleAppPage };
