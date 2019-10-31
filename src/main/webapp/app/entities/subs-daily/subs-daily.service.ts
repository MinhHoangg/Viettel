import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISUBS_DAILY } from 'app/shared/model/subs-daily.model';

type EntityResponseType = HttpResponse<ISUBS_DAILY>;
type EntityArrayResponseType = HttpResponse<ISUBS_DAILY[]>;

@Injectable({ providedIn: 'root' })
export class SUBS_DAILYService {
  public resourceUrl = SERVER_API_URL + 'api/subs-dailies';

  constructor(protected http: HttpClient) {}

  create(sUBS_DAILY: ISUBS_DAILY): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sUBS_DAILY);
    return this.http
      .post<ISUBS_DAILY>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(sUBS_DAILY: ISUBS_DAILY): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(sUBS_DAILY);
    return this.http
      .put<ISUBS_DAILY>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISUBS_DAILY>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISUBS_DAILY[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(sUBS_DAILY: ISUBS_DAILY): ISUBS_DAILY {
    const copy: ISUBS_DAILY = Object.assign({}, sUBS_DAILY, {
      nextChargeDate: sUBS_DAILY.nextChargeDate != null && sUBS_DAILY.nextChargeDate.isValid() ? sUBS_DAILY.nextChargeDate.toJSON() : null,
      lastChargeDate: sUBS_DAILY.lastChargeDate != null && sUBS_DAILY.lastChargeDate.isValid() ? sUBS_DAILY.lastChargeDate.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.nextChargeDate = res.body.nextChargeDate != null ? moment(res.body.nextChargeDate) : null;
      res.body.lastChargeDate = res.body.lastChargeDate != null ? moment(res.body.lastChargeDate) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((sUBS_DAILY: ISUBS_DAILY) => {
        sUBS_DAILY.nextChargeDate = sUBS_DAILY.nextChargeDate != null ? moment(sUBS_DAILY.nextChargeDate) : null;
        sUBS_DAILY.lastChargeDate = sUBS_DAILY.lastChargeDate != null ? moment(sUBS_DAILY.lastChargeDate) : null;
      });
    }
    return res;
  }
}
