import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITransaction_logs } from 'app/shared/model/transaction-logs.model';
import { Transaction_logsService } from './transaction-logs.service';

@Component({
  selector: 'jhi-transaction-logs-delete-dialog',
  templateUrl: './transaction-logs-delete-dialog.component.html'
})
export class Transaction_logsDeleteDialogComponent {
  transaction_logs: ITransaction_logs;

  constructor(
    protected transaction_logsService: Transaction_logsService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.transaction_logsService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'transaction_logsListModification',
        content: 'Deleted an transaction_logs'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-transaction-logs-delete-popup',
  template: ''
})
export class Transaction_logsDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ transaction_logs }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(Transaction_logsDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.transaction_logs = transaction_logs;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/transaction-logs', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/transaction-logs', { outlets: { popup: null } }]);
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
