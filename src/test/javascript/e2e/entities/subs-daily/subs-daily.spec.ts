// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SUBS_DAILYComponentsPage, SUBS_DAILYDeleteDialog, SUBS_DAILYUpdatePage } from './subs-daily.page-object';

const expect = chai.expect;

describe('SUBS_DAILY e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let sUBS_DAILYComponentsPage: SUBS_DAILYComponentsPage;
  let sUBS_DAILYUpdatePage: SUBS_DAILYUpdatePage;
  let sUBS_DAILYDeleteDialog: SUBS_DAILYDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load SUBS_DAILIES', async () => {
    await navBarPage.goToEntity('subs-daily');
    sUBS_DAILYComponentsPage = new SUBS_DAILYComponentsPage();
    await browser.wait(ec.visibilityOf(sUBS_DAILYComponentsPage.title), 5000);
    expect(await sUBS_DAILYComponentsPage.getTitle()).to.eq('viettelApp.sUBS_DAILY.home.title');
  });

  it('should load create SUBS_DAILY page', async () => {
    await sUBS_DAILYComponentsPage.clickOnCreateButton();
    sUBS_DAILYUpdatePage = new SUBS_DAILYUpdatePage();
    expect(await sUBS_DAILYUpdatePage.getPageTitle()).to.eq('viettelApp.sUBS_DAILY.home.createOrEditLabel');
    await sUBS_DAILYUpdatePage.cancel();
  });

  it('should create and save SUBS_DAILIES', async () => {
    const nbButtonsBeforeCreate = await sUBS_DAILYComponentsPage.countDeleteButtons();

    await sUBS_DAILYComponentsPage.clickOnCreateButton();
    await promise.all([
      sUBS_DAILYUpdatePage.setSystemIDInput('systemID'),
      sUBS_DAILYUpdatePage.setUserIDInput('userID'),
      sUBS_DAILYUpdatePage.setServiceIDInput('serviceID'),
      sUBS_DAILYUpdatePage.setCommandCodeInput('commandCode'),
      sUBS_DAILYUpdatePage.setInfoInput('info'),
      sUBS_DAILYUpdatePage.setReceiveTimeInput('receiveTime'),
      sUBS_DAILYUpdatePage.setIsPauseInput('5'),
      sUBS_DAILYUpdatePage.setChanelInput('chanel'),
      sUBS_DAILYUpdatePage.setNextChargeDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      sUBS_DAILYUpdatePage.setLastChargeDateInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      sUBS_DAILYUpdatePage.setPriceInput('5'),
      sUBS_DAILYUpdatePage.setOffTimeInput('offTime'),
      sUBS_DAILYUpdatePage.setOffReasonInput('offReason'),
      sUBS_DAILYUpdatePage.setTypeRegisterInput('typeRegister')
    ]);
    expect(await sUBS_DAILYUpdatePage.getSystemIDInput()).to.eq('systemID', 'Expected SystemID value to be equals to systemID');
    expect(await sUBS_DAILYUpdatePage.getUserIDInput()).to.eq('userID', 'Expected UserID value to be equals to userID');
    expect(await sUBS_DAILYUpdatePage.getServiceIDInput()).to.eq('serviceID', 'Expected ServiceID value to be equals to serviceID');
    expect(await sUBS_DAILYUpdatePage.getCommandCodeInput()).to.eq('commandCode', 'Expected CommandCode value to be equals to commandCode');
    expect(await sUBS_DAILYUpdatePage.getInfoInput()).to.eq('info', 'Expected Info value to be equals to info');
    expect(await sUBS_DAILYUpdatePage.getReceiveTimeInput()).to.eq('receiveTime', 'Expected ReceiveTime value to be equals to receiveTime');
    expect(await sUBS_DAILYUpdatePage.getIsPauseInput()).to.eq('5', 'Expected isPause value to be equals to 5');
    expect(await sUBS_DAILYUpdatePage.getChanelInput()).to.eq('chanel', 'Expected Chanel value to be equals to chanel');
    expect(await sUBS_DAILYUpdatePage.getNextChargeDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected nextChargeDate value to be equals to 2000-12-31'
    );
    expect(await sUBS_DAILYUpdatePage.getLastChargeDateInput()).to.contain(
      '2001-01-01T02:30',
      'Expected lastChargeDate value to be equals to 2000-12-31'
    );
    expect(await sUBS_DAILYUpdatePage.getPriceInput()).to.eq('5', 'Expected price value to be equals to 5');
    expect(await sUBS_DAILYUpdatePage.getOffTimeInput()).to.eq('offTime', 'Expected OffTime value to be equals to offTime');
    expect(await sUBS_DAILYUpdatePage.getOffReasonInput()).to.eq('offReason', 'Expected OffReason value to be equals to offReason');
    expect(await sUBS_DAILYUpdatePage.getTypeRegisterInput()).to.eq(
      'typeRegister',
      'Expected TypeRegister value to be equals to typeRegister'
    );
    await sUBS_DAILYUpdatePage.save();
    expect(await sUBS_DAILYUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await sUBS_DAILYComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last SUBS_DAILY', async () => {
    const nbButtonsBeforeDelete = await sUBS_DAILYComponentsPage.countDeleteButtons();
    await sUBS_DAILYComponentsPage.clickOnLastDeleteButton();

    sUBS_DAILYDeleteDialog = new SUBS_DAILYDeleteDialog();
    expect(await sUBS_DAILYDeleteDialog.getDialogTitle()).to.eq('viettelApp.sUBS_DAILY.delete.question');
    await sUBS_DAILYDeleteDialog.clickOnConfirmButton();

    expect(await sUBS_DAILYComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
