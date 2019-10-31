import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ViettelTestModule } from '../../../test.module';
import { Transaction_logsDetailComponent } from 'app/entities/transaction-logs/transaction-logs-detail.component';
import { Transaction_logs } from 'app/shared/model/transaction-logs.model';

describe('Component Tests', () => {
  describe('Transaction_logs Management Detail Component', () => {
    let comp: Transaction_logsDetailComponent;
    let fixture: ComponentFixture<Transaction_logsDetailComponent>;
    const route = ({ data: of({ transaction_logs: new Transaction_logs(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ViettelTestModule],
        declarations: [Transaction_logsDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(Transaction_logsDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(Transaction_logsDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.transaction_logs).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
