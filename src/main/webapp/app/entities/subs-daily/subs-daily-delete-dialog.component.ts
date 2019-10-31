import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISUBS_DAILY } from 'app/shared/model/subs-daily.model';
import { SUBS_DAILYService } from './subs-daily.service';

@Component({
  selector: 'jhi-subs-daily-delete-dialog',
  templateUrl: './subs-daily-delete-dialog.component.html'
})
export class SUBS_DAILYDeleteDialogComponent {
  sUBS_DAILY: ISUBS_DAILY;

  constructor(
    protected sUBS_DAILYService: SUBS_DAILYService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.sUBS_DAILYService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'sUBS_DAILYListModification',
        content: 'Deleted an sUBS_DAILY'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-subs-daily-delete-popup',
  template: ''
})
export class SUBS_DAILYDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ sUBS_DAILY }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(SUBS_DAILYDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.sUBS_DAILY = sUBS_DAILY;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/subs-daily', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/subs-daily', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
