import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITransaction_logs } from 'app/shared/model/transaction-logs.model';

@Component({
  selector: 'jhi-transaction-logs-detail',
  templateUrl: './transaction-logs-detail.component.html'
})
export class Transaction_logsDetailComponent implements OnInit {
  transaction_logs: ITransaction_logs;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ transaction_logs }) => {
      this.transaction_logs = transaction_logs;
    });
  }

  previousState() {
    window.history.back();
  }
}
