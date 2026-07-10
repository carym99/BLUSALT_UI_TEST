const { BasePage } = require('./BasePage');

class DynamicTablePage extends BasePage {
  constructor() {
    super();
    this.path = '/dynamictable';
    this.columnHeader = '[role="columnheader"]';
    this.row = '[role="row"]';
    this.cell = '[role="cell"]';
    this.chromeCpuLabel = 'p.bg-warning';
  }

  open() {
    return this.visit(this.path);
  }

  getChromeCpuFromTable() {
    return cy.get(this.columnHeader).then(($headers) => {
      const cpuColumnIndex = [...$headers].findIndex(
        (header) => header.textContent.trim() === 'CPU'
      );

      return cy
        .contains(this.row, 'Chrome')
        .find(this.cell)
        .eq(cpuColumnIndex)
        .invoke('text')
        .then((text) => text.trim());
    });
  }

  getChromeCpuFromLabel() {
    return cy
      .get(this.chromeCpuLabel)
      .invoke('text')
      .then((text) => text.replace('Chrome CPU:', '').trim());
  }
}

module.exports = { DynamicTablePage };
