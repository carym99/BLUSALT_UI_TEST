const { BasePage } = require('./BasePage');

class FileUploadPage extends BasePage {
  constructor() {
    super();
    this.path = '/upload';
    this.iframe = 'iframe';
    this.uploadBox = '.upload-box';
    this.browseButton = '.browse-btn';
    this.fileInput = 'input[type="file"]';
    this.fileList = '.file-list';
    this.fileItem = '.file-item';
    this.successFile = '.success-file';
    this.fixtureFile = 'cypress/fixtures/sample-upload.txt';
  }

  open() {
    return this.visit(this.path);
  }

  getUploadFrame() {
    return cy.getIframeBody(this.iframe);
  }

  uploadViaDragAndDrop() {
    this.getUploadFrame()
      .find(this.uploadBox)
      .selectFile(this.fixtureFile, { action: 'drag-drop' });
    return this;
  }

  uploadViaBrowseButton() {
    this.getUploadFrame()
      .find(this.fileInput)
      .selectFile(this.fixtureFile, { force: true });
    return this;
  }

  verifyFileUploaded(fileName = 'sample-upload.txt') {
    this.getUploadFrame().find(this.successFile).should('be.visible');

    this.getUploadFrame()
      .find(this.fileItem)
      .should('be.visible')
      .and('contain.text', fileName);

    return this;
  }
}

module.exports = { FileUploadPage };
