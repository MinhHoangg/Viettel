import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ViettelSharedModule } from 'app/shared/shared.module';
import { Transaction_logsComponent } from './transaction-logs.component';
import { Transaction_logsDetailComponent } from './transaction-logs-detail.component';
import { Transaction_logsUpdateComponent } from './transaction-logs-update.component';
import { Transaction_logsDeletePopupComponent, Transaction_logsDeleteDialogComponent } from './transaction-logs-delete-dialog.component';
import { transaction_logsRoute, transaction_logsPopupRoute } from './transaction-logs.route';

const ENTITY_STATES = [...transaction_logsRoute, ...transaction_logsPopupRoute];

@NgModule({
  imports: [ViettelSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    Transaction_logsComponent,
    Transaction_logsDetailComponent,
    Transaction_logsUpdateComponent,
    Transaction_logsDeleteDialogComponent,
    Transaction_logsDeletePopupComponent
  ],
  entryComponents: [Transaction_logsDeleteDialogComponent]
})
export class ViettelTransaction_logsModule {}
