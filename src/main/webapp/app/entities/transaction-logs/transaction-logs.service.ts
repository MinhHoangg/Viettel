import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITransaction_logs } from 'app/shared/model/transaction-logs.model';

type EntityResponseType = HttpResponse<ITransaction_logs>;
type EntityArrayResponseType = HttpResponse<ITransaction_logs[]>;

@Injectable({ providedIn: 'root' })
export class Transaction_logsService {
  public resourceUrl = SERVER_API_URL + 'api/transaction-logs';

  constructor(protected http: HttpClient) {}

  create(transaction_logs: ITransaction_logs): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(transaction_logs);
    return this.http
      .post<ITransaction_logs>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(transaction_logs: ITransaction_logs): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(transaction_logs);
    return this.http
      .put<ITransaction_logs>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITransaction_logs>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITransaction_logs[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(transaction_logs: ITransaction_logs): ITransaction_logs {
    const copy: ITransaction_logs = Object.assign({}, transaction_logs, {
      datetime: transaction_logs.datetime != null && transaction_logs.datetime.isValid() ? transaction_logs.datetime.toJSON() : null
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.datetime = res.body.datetime != null ? moment(res.body.datetime) : null;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((transaction_logs: ITransaction_logs) => {
        transaction_logs.datetime = transaction_logs.datetime != null ? moment(transaction_logs.datetime) : null;
      });
    }
    return res;
  }
}
