import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Transaction_logs } from 'app/shared/model/transaction-logs.model';
import { Transaction_logsService } from './transaction-logs.service';
import { Transaction_logsComponent } from './transaction-logs.component';
import { Transaction_logsDetailComponent } from './transaction-logs-detail.component';
import { Transaction_logsUpdateComponent } from './transaction-logs-update.component';
import { Transaction_logsDeletePopupComponent } from './transaction-logs-delete-dialog.component';
import { ITransaction_logs } from 'app/shared/model/transaction-logs.model';

@Injectable({ providedIn: 'root' })
export class Transaction_logsResolve implements Resolve<ITransaction_logs> {
  constructor(private service: Transaction_logsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITransaction_logs> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Transaction_logs>) => response.ok),
        map((transaction_logs: HttpResponse<Transaction_logs>) => transaction_logs.body)
      );
    }
    return of(new Transaction_logs());
  }
}

export const transaction_logsRoute: Routes = [
  {
    path: '',
    component: Transaction_logsComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'viettelApp.transaction_logs.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: Transaction_logsDetailComponent,
    resolve: {
      transaction_logs: Transaction_logsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'viettelApp.transaction_logs.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: Transaction_logsUpdateComponent,
    resolve: {
      transaction_logs: Transaction_logsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'viettelApp.transaction_logs.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: Transaction_logsUpdateComponent,
    resolve: {
      transaction_logs: Transaction_logsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'viettelApp.transaction_logs.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const transaction_logsPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: Transaction_logsDeletePopupComponent,
    resolve: {
      transaction_logs: Transaction_logsResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'viettelApp.transaction_logs.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
