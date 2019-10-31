import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'subs-daily',
        loadChildren: () => import('./subs-daily/subs-daily.module').then(m => m.ViettelSUBS_DAILYModule)
      },
      {
        path: 'transaction-logs',
        loadChildren: () => import('./transaction-logs/transaction-logs.module').then(m => m.ViettelTransaction_logsModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class ViettelEntityModule {}
