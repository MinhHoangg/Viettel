import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ViettelTestModule } from '../../../test.module';
import { SUBS_DAILYDetailComponent } from 'app/entities/subs-daily/subs-daily-detail.component';
import { SUBS_DAILY } from 'app/shared/model/subs-daily.model';

describe('Component Tests', () => {
  describe('SUBS_DAILY Management Detail Component', () => {
    let comp: SUBS_DAILYDetailComponent;
    let fixture: ComponentFixture<SUBS_DAILYDetailComponent>;
    const route = ({ data: of({ sUBS_DAILY: new SUBS_DAILY(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ViettelTestModule],
        declarations: [SUBS_DAILYDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(SUBS_DAILYDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SUBS_DAILYDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.sUBS_DAILY).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
