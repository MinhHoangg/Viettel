import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ViettelTestModule } from '../../../test.module';
import { Transaction_logsUpdateComponent } from 'app/entities/transaction-logs/transaction-logs-update.component';
import { Transaction_logsService } from 'app/entities/transaction-logs/transaction-logs.service';
import { Transaction_logs } from 'app/shared/model/transaction-logs.model';

describe('Component Tests', () => {
  describe('Transaction_logs Management Update Component', () => {
    let comp: Transaction_logsUpdateComponent;
    let fixture: ComponentFixture<Transaction_logsUpdateComponent>;
    let service: Transaction_logsService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ViettelTestModule],
        declarations: [Transaction_logsUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(Transaction_logsUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(Transaction_logsUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(Transaction_logsService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Transaction_logs(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Transaction_logs();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
