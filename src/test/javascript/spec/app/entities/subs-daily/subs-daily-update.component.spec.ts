import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { ViettelTestModule } from '../../../test.module';
import { SUBS_DAILYUpdateComponent } from 'app/entities/subs-daily/subs-daily-update.component';
import { SUBS_DAILYService } from 'app/entities/subs-daily/subs-daily.service';
import { SUBS_DAILY } from 'app/shared/model/subs-daily.model';

describe('Component Tests', () => {
  describe('SUBS_DAILY Management Update Component', () => {
    let comp: SUBS_DAILYUpdateComponent;
    let fixture: ComponentFixture<SUBS_DAILYUpdateComponent>;
    let service: SUBS_DAILYService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ViettelTestModule],
        declarations: [SUBS_DAILYUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SUBS_DAILYUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SUBS_DAILYUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SUBS_DAILYService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SUBS_DAILY(123);
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
        const entity = new SUBS_DAILY();
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
