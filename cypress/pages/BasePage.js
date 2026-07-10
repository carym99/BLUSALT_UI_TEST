class BasePage {
  visit(path) {
    cy.visit(path);
    return this;
  }
}

module.exports = { BasePage };
