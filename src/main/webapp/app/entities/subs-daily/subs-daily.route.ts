import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SUBS_DAILY } from 'app/shared/model/subs-daily.model';
import { SUBS_DAILYService } from './subs-daily.service';
import { SUBS_DAILYComponent } from './subs-daily.component';
import { SUBS_DAILYDetailComponent } from './subs-daily-detail.component';
import { SUBS_DAILYUpdateComponent } from './subs-daily-update.component';
import { SUBS_DAILYDeletePopupComponent } from './subs-daily-delete-dialog.component';
import { ISUBS_DAILY } from 'app/shared/model/subs-daily.model';

@Injectable({ providedIn: 'root' })
export class SUBS_DAILYResolve implements Resolve<ISUBS_DAILY> {
  constructor(private service: SUBS_DAILYService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISUBS_DAILY> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<SUBS_DAILY>) => response.ok),
        map((sUBS_DAILY: HttpResponse<SUBS_DAILY>) => sUBS_DAILY.body)
      );
    }
    return of(new SUBS_DAILY());
  }
}

export const sUBS_DAILYRoute: Routes = [
  {
    path: '',
    component: SUBS_DAILYComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: ['ROLE_USER'],
      defaultSort: 'id,asc',
      pageTitle: 'viettelApp.sUBS_DAILY.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SUBS_DAILYDetailComponent,
    resolve: {
      sUBS_DAILY: SUBS_DAILYResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'viettelApp.sUBS_DAILY.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SUBS_DAILYUpdateComponent,
    resolve: {
      sUBS_DAILY: SUBS_DAILYResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'viettelApp.sUBS_DAILY.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SUBS_DAILYUpdateComponent,
    resolve: {
      sUBS_DAILY: SUBS_DAILYResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'viettelApp.sUBS_DAILY.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const sUBS_DAILYPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: SUBS_DAILYDeletePopupComponent,
    resolve: {
      sUBS_DAILY: SUBS_DAILYResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'viettelApp.sUBS_DAILY.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
