import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { SUBS_DAILYService } from 'app/entities/subs-daily/subs-daily.service';
import { ISUBS_DAILY, SUBS_DAILY } from 'app/shared/model/subs-daily.model';

describe('Service Tests', () => {
  describe('SUBS_DAILY Service', () => {
    let injector: TestBed;
    let service: SUBS_DAILYService;
    let httpMock: HttpTestingController;
    let elemDefault: ISUBS_DAILY;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(SUBS_DAILYService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new SUBS_DAILY(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0,
        'AAAAAAA',
        currentDate,
        currentDate,
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            nextChargeDate: currentDate.format(DATE_TIME_FORMAT),
            lastChargeDate: currentDate.format(DATE_TIME_FORMAT)
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

      it('should create a SUBS_DAILY', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            nextChargeDate: currentDate.format(DATE_TIME_FORMAT),
            lastChargeDate: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            nextChargeDate: currentDate,
            lastChargeDate: currentDate
          },
          returnedFromService
        );
        service
          .create(new SUBS_DAILY(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a SUBS_DAILY', () => {
        const returnedFromService = Object.assign(
          {
            systemID: 'BBBBBB',
            userID: 'BBBBBB',
            serviceID: 'BBBBBB',
            commandCode: 'BBBBBB',
            info: 'BBBBBB',
            receiveTime: 'BBBBBB',
            isPause: 1,
            chanel: 'BBBBBB',
            nextChargeDate: currentDate.format(DATE_TIME_FORMAT),
            lastChargeDate: currentDate.format(DATE_TIME_FORMAT),
            price: 1,
            offTime: 'BBBBBB',
            offReason: 'BBBBBB',
            typeRegister: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            nextChargeDate: currentDate,
            lastChargeDate: currentDate
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

      it('should return a list of SUBS_DAILY', () => {
        const returnedFromService = Object.assign(
          {
            systemID: 'BBBBBB',
            userID: 'BBBBBB',
            serviceID: 'BBBBBB',
            commandCode: 'BBBBBB',
            info: 'BBBBBB',
            receiveTime: 'BBBBBB',
            isPause: 1,
            chanel: 'BBBBBB',
            nextChargeDate: currentDate.format(DATE_TIME_FORMAT),
            lastChargeDate: currentDate.format(DATE_TIME_FORMAT),
            price: 1,
            offTime: 'BBBBBB',
            offReason: 'BBBBBB',
            typeRegister: 'BBBBBB'
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            nextChargeDate: currentDate,
            lastChargeDate: currentDate
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

      it('should delete a SUBS_DAILY', () => {
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
