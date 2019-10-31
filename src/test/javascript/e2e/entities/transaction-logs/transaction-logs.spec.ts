// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Transaction_logsComponentsPage, Transaction_logsDeleteDialog, Transaction_logsUpdatePage } from './transaction-logs.page-object';

const expect = chai.expect;

describe('Transaction_logs e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let transaction_logsComponentsPage: Transaction_logsComponentsPage;
  let transaction_logsUpdatePage: Transaction_logsUpdatePage;
  let transaction_logsDeleteDialog: Transaction_logsDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Transaction_logs', async () => {
    await navBarPage.goToEntity('transaction-logs');
    transaction_logsComponentsPage = new Transaction_logsComponentsPage();
    await browser.wait(ec.visibilityOf(transaction_logsComponentsPage.title), 5000);
    expect(await transaction_logsComponentsPage.getTitle()).to.eq('viettelApp.transaction_logs.home.title');
  });

  it('should load create Transaction_logs page', async () => {
    await transaction_logsComponentsPage.clickOnCreateButton();
    transaction_logsUpdatePage = new Transaction_logsUpdatePage();
    expect(await transaction_logsUpdatePage.getPageTitle()).to.eq('viettelApp.transaction_logs.home.createOrEditLabel');
    await transaction_logsUpdatePage.cancel();
  });

  it('should create and save Transaction_logs', async () => {
    const nbButtonsBeforeCreate = await transaction_logsComponentsPage.countDeleteButtons();

    await transaction_logsComponentsPage.clickOnCreateButton();
    await promise.all([
      transaction_logsUpdatePage.setMsisdnInput('msisdn'),
      transaction_logsUpdatePage.setCmdInput('cmd'),
      transaction_logsUpdatePage.setDescriptionsInput('descriptions'),
      transaction_logsUpdatePage.setPriceInput('5'),
      transaction_logsUpdatePage.setDatetimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      transaction_logsUpdatePage.setResultInput('5'),
      transaction_logsUpdatePage.setTrans_idInput('5'),
      transaction_logsUpdatePage.setSourceInput('source'),
      transaction_logsUpdatePage.setSub_typeInput('sub_type'),
      transaction_logsUpdatePage.setSystemidInput('systemid'),
      transaction_logsUpdatePage.setServiceidInput('serviceid'),
      transaction_logsUpdatePage.setChannelInput('channel')
    ]);
    expect(await transaction_logsUpdatePage.getMsisdnInput()).to.eq('msisdn', 'Expected Msisdn value to be equals to msisdn');
    expect(await transaction_logsUpdatePage.getCmdInput()).to.eq('cmd', 'Expected Cmd value to be equals to cmd');
    expect(await transaction_logsUpdatePage.getDescriptionsInput()).to.eq(
      'descriptions',
      'Expected Descriptions value to be equals to descriptions'
    );
    expect(await transaction_logsUpdatePage.getPriceInput()).to.eq('5', 'Expected price value to be equals to 5');
    expect(await transaction_logsUpdatePage.getDatetimeInput()).to.contain(
      '2001-01-01T02:30',
      'Expected datetime value to be equals to 2000-12-31'
    );
    expect(await transaction_logsUpdatePage.getResultInput()).to.eq('5', 'Expected result value to be equals to 5');
    expect(await transaction_logsUpdatePage.getTrans_idInput()).to.eq('5', 'Expected trans_id value to be equals to 5');
    expect(await transaction_logsUpdatePage.getSourceInput()).to.eq('source', 'Expected Source value to be equals to source');
    expect(await transaction_logsUpdatePage.getSub_typeInput()).to.eq('sub_type', 'Expected Sub_type value to be equals to sub_type');
    expect(await transaction_logsUpdatePage.getSystemidInput()).to.eq('systemid', 'Expected Systemid value to be equals to systemid');
    expect(await transaction_logsUpdatePage.getServiceidInput()).to.eq('serviceid', 'Expected Serviceid value to be equals to serviceid');
    expect(await transaction_logsUpdatePage.getChannelInput()).to.eq('channel', 'Expected Channel value to be equals to channel');
    await transaction_logsUpdatePage.save();
    expect(await transaction_logsUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await transaction_logsComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last Transaction_logs', async () => {
    const nbButtonsBeforeDelete = await transaction_logsComponentsPage.countDeleteButtons();
    await transaction_logsComponentsPage.clickOnLastDeleteButton();

    transaction_logsDeleteDialog = new Transaction_logsDeleteDialog();
    expect(await transaction_logsDeleteDialog.getDialogTitle()).to.eq('viettelApp.transaction_logs.delete.question');
    await transaction_logsDeleteDialog.clickOnConfirmButton();

    expect(await transaction_logsComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
