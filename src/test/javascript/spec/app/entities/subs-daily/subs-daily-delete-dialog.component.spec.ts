import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ViettelTestModule } from '../../../test.module';
import { SUBS_DAILYDeleteDialogComponent } from 'app/entities/subs-daily/subs-daily-delete-dialog.component';
import { SUBS_DAILYService } from 'app/entities/subs-daily/subs-daily.service';

describe('Component Tests', () => {
  describe('SUBS_DAILY Management Delete Component', () => {
    let comp: SUBS_DAILYDeleteDialogComponent;
    let fixture: ComponentFixture<SUBS_DAILYDeleteDialogComponent>;
    let service: SUBS_DAILYService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ViettelTestModule],
        declarations: [SUBS_DAILYDeleteDialogComponent]
      })
        .overrideTemplate(SUBS_DAILYDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SUBS_DAILYDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SUBS_DAILYService);
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
