import { element, by, ElementFinder } from 'protractor';

export class Transaction_logsComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-transaction-logs div table .btn-danger'));
  title = element.all(by.css('jhi-transaction-logs div h2#page-heading span')).first();

  async clickOnCreateButton(timeout?: number) {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(timeout?: number) {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons() {
    return this.deleteButtons.count();
  }

  async getTitle() {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class Transaction_logsUpdatePage {
  pageTitle = element(by.id('jhi-transaction-logs-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  msisdnInput = element(by.id('field_msisdn'));
  cmdInput = element(by.id('field_cmd'));
  descriptionsInput = element(by.id('field_descriptions'));
  priceInput = element(by.id('field_price'));
  datetimeInput = element(by.id('field_datetime'));
  resultInput = element(by.id('field_result'));
  trans_idInput = element(by.id('field_trans_id'));
  sourceInput = element(by.id('field_source'));
  sub_typeInput = element(by.id('field_sub_type'));
  systemidInput = element(by.id('field_systemid'));
  serviceidInput = element(by.id('field_serviceid'));
  channelInput = element(by.id('field_channel'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setMsisdnInput(msisdn) {
    await this.msisdnInput.sendKeys(msisdn);
  }

  async getMsisdnInput() {
    return await this.msisdnInput.getAttribute('value');
  }

  async setCmdInput(cmd) {
    await this.cmdInput.sendKeys(cmd);
  }

  async getCmdInput() {
    return await this.cmdInput.getAttribute('value');
  }

  async setDescriptionsInput(descriptions) {
    await this.descriptionsInput.sendKeys(descriptions);
  }

  async getDescriptionsInput() {
    return await this.descriptionsInput.getAttribute('value');
  }

  async setPriceInput(price) {
    await this.priceInput.sendKeys(price);
  }

  async getPriceInput() {
    return await this.priceInput.getAttribute('value');
  }

  async setDatetimeInput(datetime) {
    await this.datetimeInput.sendKeys(datetime);
  }

  async getDatetimeInput() {
    return await this.datetimeInput.getAttribute('value');
  }

  async setResultInput(result) {
    await this.resultInput.sendKeys(result);
  }

  async getResultInput() {
    return await this.resultInput.getAttribute('value');
  }

  async setTrans_idInput(trans_id) {
    await this.trans_idInput.sendKeys(trans_id);
  }

  async getTrans_idInput() {
    return await this.trans_idInput.getAttribute('value');
  }

  async setSourceInput(source) {
    await this.sourceInput.sendKeys(source);
  }

  async getSourceInput() {
    return await this.sourceInput.getAttribute('value');
  }

  async setSub_typeInput(sub_type) {
    await this.sub_typeInput.sendKeys(sub_type);
  }

  async getSub_typeInput() {
    return await this.sub_typeInput.getAttribute('value');
  }

  async setSystemidInput(systemid) {
    await this.systemidInput.sendKeys(systemid);
  }

  async getSystemidInput() {
    return await this.systemidInput.getAttribute('value');
  }

  async setServiceidInput(serviceid) {
    await this.serviceidInput.sendKeys(serviceid);
  }

  async getServiceidInput() {
    return await this.serviceidInput.getAttribute('value');
  }

  async setChannelInput(channel) {
    await this.channelInput.sendKeys(channel);
  }

  async getChannelInput() {
    return await this.channelInput.getAttribute('value');
  }

  async save(timeout?: number) {
    await this.saveButton.click();
  }

  async cancel(timeout?: number) {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class Transaction_logsDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-transaction_logs-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-transaction_logs'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
