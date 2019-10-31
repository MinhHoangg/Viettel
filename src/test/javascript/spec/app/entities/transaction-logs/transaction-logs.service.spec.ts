import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { Transaction_logsService } from 'app/entities/transaction-logs/transaction-logs.service';
import { ITransaction_logs, Transaction_logs } from 'app/shared/model/transaction-logs.model';

describe('Service Tests', () => {
  describe('Transaction_logs Service', () => {
    let injector: TestBed;
    let service: Transaction_logsService;
    let httpMock: HttpTestingController;
    let elemDefault: ITransaction_logs;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(Transaction_logsService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Transaction_logs(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0,
        currentDate,
        0,
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            datetime: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find(123)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a Transaction_logs', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            datetime: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            datetime: currentDate
          },
          returnedFromService
        );
        service
          .create(new Transaction_logs(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Transaction_logs', () => {
        const returnedFromService = Object.assign(
          {
            msisdn: 'BBBBBB',
            cmd: 'BBBBBB',
            descriptions: 'BBBBBB',
            price: 1,
            datetime: currentDate.format(DATE_TIME_FORMAT),
            result: 1,
            trans_id: 1,
            source: 'BBBBBB',
            sub_type: 'BBBBBB',
            systemid: 'BBBBBB',
            serviceid: 'BBBBBB',
            channel: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datetime: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of Transaction_logs', () => {
        const returnedFromService = Object.assign(
          {
            msisdn: 'BBBBBB',
            cmd: 'BBBBBB',
            descriptions: 'BBBBBB',
            price: 1,
            datetime: currentDate.format(DATE_TIME_FORMAT),
            result: 1,
            trans_id: 1,
            source: 'BBBBBB',
            sub_type: 'BBBBBB',
            systemid: 'BBBBBB',
            serviceid: 'BBBBBB',
            channel: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            datetime: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Transaction_logs', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
