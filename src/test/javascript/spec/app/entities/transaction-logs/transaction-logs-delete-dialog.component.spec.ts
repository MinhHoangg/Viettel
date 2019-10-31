import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ViettelTestModule } from '../../../test.module';
import { Transaction_logsDeleteDialogComponent } from 'app/entities/transaction-logs/transaction-logs-delete-dialog.component';
import { Transaction_logsService } from 'app/entities/transaction-logs/transaction-logs.service';

describe('Component Tests', () => {
  describe('Transaction_logs Management Delete Component', () => {
    let comp: Transaction_logsDeleteDialogComponent;
    let fixture: ComponentFixture<Transaction_logsDeleteDialogComponent>;
    let service: Transaction_logsService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ViettelTestModule],
        declarations: [Transaction_logsDeleteDialogComponent]
      })
        .overrideTemplate(Transaction_logsDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(Transaction_logsDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(Transaction_logsService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
