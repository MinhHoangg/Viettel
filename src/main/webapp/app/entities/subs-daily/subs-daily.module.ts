import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ViettelSharedModule } from 'app/shared/shared.module';
import { SUBS_DAILYComponent } from './subs-daily.component';
import { SUBS_DAILYDetailComponent } from './subs-daily-detail.component';
import { SUBS_DAILYUpdateComponent } from './subs-daily-update.component';
import { SUBS_DAILYDeletePopupComponent, SUBS_DAILYDeleteDialogComponent } from './subs-daily-delete-dialog.component';
import { sUBS_DAILYRoute, sUBS_DAILYPopupRoute } from './subs-daily.route';

const ENTITY_STATES = [...sUBS_DAILYRoute, ...sUBS_DAILYPopupRoute];

@NgModule({
  imports: [ViettelSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [
    SUBS_DAILYComponent,
    SUBS_DAILYDetailComponent,
    SUBS_DAILYUpdateComponent,
    SUBS_DAILYDeleteDialogComponent,
    SUBS_DAILYDeletePopupComponent
  ],
  entryComponents: [SUBS_DAILYDeleteDialogComponent]
})
export class ViettelSUBS_DAILYModule {}
