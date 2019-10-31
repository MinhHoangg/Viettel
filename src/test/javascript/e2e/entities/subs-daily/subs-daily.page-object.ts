import { element, by, ElementFinder } from 'protractor';

export class SUBS_DAILYComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-subs-daily div table .btn-danger'));
  title = element.all(by.css('jhi-subs-daily div h2#page-heading span')).first();

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

export class SUBS_DAILYUpdatePage {
  pageTitle = element(by.id('jhi-subs-daily-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  systemIDInput = element(by.id('field_systemID'));
  userIDInput = element(by.id('field_userID'));
  serviceIDInput = element(by.id('field_serviceID'));
  commandCodeInput = element(by.id('field_commandCode'));
  infoInput = element(by.id('field_info'));
  receiveTimeInput = element(by.id('field_receiveTime'));
  isPauseInput = element(by.id('field_isPause'));
  chanelInput = element(by.id('field_chanel'));
  nextChargeDateInput = element(by.id('field_nextChargeDate'));
  lastChargeDateInput = element(by.id('field_lastChargeDate'));
  priceInput = element(by.id('field_price'));
  offTimeInput = element(by.id('field_offTime'));
  offReasonInput = element(by.id('field_offReason'));
  typeRegisterInput = element(by.id('field_typeRegister'));

  async getPageTitle() {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setSystemIDInput(systemID) {
    await this.systemIDInput.sendKeys(systemID);
  }

  async getSystemIDInput() {
    return await this.systemIDInput.getAttribute('value');
  }

  async setUserIDInput(userID) {
    await this.userIDInput.sendKeys(userID);
  }

  async getUserIDInput() {
    return await this.userIDInput.getAttribute('value');
  }

  async setServiceIDInput(serviceID) {
    await this.serviceIDInput.sendKeys(serviceID);
  }

  async getServiceIDInput() {
    return await this.serviceIDInput.getAttribute('value');
  }

  async setCommandCodeInput(commandCode) {
    await this.commandCodeInput.sendKeys(commandCode);
  }

  async getCommandCodeInput() {
    return await this.commandCodeInput.getAttribute('value');
  }

  async setInfoInput(info) {
    await this.infoInput.sendKeys(info);
  }

  async getInfoInput() {
    return await this.infoInput.getAttribute('value');
  }

  async setReceiveTimeInput(receiveTime) {
    await this.receiveTimeInput.sendKeys(receiveTime);
  }

  async getReceiveTimeInput() {
    return await this.receiveTimeInput.getAttribute('value');
  }

  async setIsPauseInput(isPause) {
    await this.isPauseInput.sendKeys(isPause);
  }

  async getIsPauseInput() {
    return await this.isPauseInput.getAttribute('value');
  }

  async setChanelInput(chanel) {
    await this.chanelInput.sendKeys(chanel);
  }

  async getChanelInput() {
    return await this.chanelInput.getAttribute('value');
  }

  async setNextChargeDateInput(nextChargeDate) {
    await this.nextChargeDateInput.sendKeys(nextChargeDate);
  }

  async getNextChargeDateInput() {
    return await this.nextChargeDateInput.getAttribute('value');
  }

  async setLastChargeDateInput(lastChargeDate) {
    await this.lastChargeDateInput.sendKeys(lastChargeDate);
  }

  async getLastChargeDateInput() {
    return await this.lastChargeDateInput.getAttribute('value');
  }

  async setPriceInput(price) {
    await this.priceInput.sendKeys(price);
  }

  async getPriceInput() {
    return await this.priceInput.getAttribute('value');
  }

  async setOffTimeInput(offTime) {
    await this.offTimeInput.sendKeys(offTime);
  }

  async getOffTimeInput() {
    return await this.offTimeInput.getAttribute('value');
  }

  async setOffReasonInput(offReason) {
    await this.offReasonInput.sendKeys(offReason);
  }

  async getOffReasonInput() {
    return await this.offReasonInput.getAttribute('value');
  }

  async setTypeRegisterInput(typeRegister) {
    await this.typeRegisterInput.sendKeys(typeRegister);
  }

  async getTypeRegisterInput() {
    return await this.typeRegisterInput.getAttribute('value');
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

export class SUBS_DAILYDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-sUBS_DAILY-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-sUBS_DAILY'));

  async getDialogTitle() {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(timeout?: number) {
    await this.confirmButton.click();
  }
}
