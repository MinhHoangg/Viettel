import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ITransaction_logs, Transaction_logs } from 'app/shared/model/transaction-logs.model';
import { Transaction_logsService } from './transaction-logs.service';

@Component({
  selector: 'jhi-transaction-logs-update',
  templateUrl: './transaction-logs-update.component.html'
})
export class Transaction_logsUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    msisdn: [null, [Validators.maxLength(20)]],
    cmd: [null, [Validators.maxLength(20)]],
    descriptions: [null, [Validators.maxLength(500)]],
    price: [],
    datetime: [],
    result: [],
    trans_id: [null, [Validators.required]],
    source: [null, [Validators.maxLength(100)]],
    sub_type: [null, [Validators.maxLength(50)]],
    systemid: [null, [Validators.maxLength(15)]],
    serviceid: [null, [Validators.maxLength(15)]],
    channel: [null, [Validators.maxLength(15)]]
  });

  constructor(
    protected transaction_logsService: Transaction_logsService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ transaction_logs }) => {
      this.updateForm(transaction_logs);
    });
  }

  updateForm(transaction_logs: ITransaction_logs) {
    this.editForm.patchValue({
      id: transaction_logs.id,
      msisdn: transaction_logs.msisdn,
      cmd: transaction_logs.cmd,
      descriptions: transaction_logs.descriptions,
      price: transaction_logs.price,
      datetime: transaction_logs.datetime != null ? transaction_logs.datetime.format(DATE_TIME_FORMAT) : null,
      result: transaction_logs.result,
      trans_id: transaction_logs.trans_id,
      source: transaction_logs.source,
      sub_type: transaction_logs.sub_type,
      systemid: transaction_logs.systemid,
      serviceid: transaction_logs.serviceid,
      channel: transaction_logs.channel
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const transaction_logs = this.createFromForm();
    if (transaction_logs.id !== undefined) {
      this.subscribeToSaveResponse(this.transaction_logsService.update(transaction_logs));
    } else {
      this.subscribeToSaveResponse(this.transaction_logsService.create(transaction_logs));
    }
  }

  private createFromForm(): ITransaction_logs {
    return {
      ...new Transaction_logs(),
      id: this.editForm.get(['id']).value,
      msisdn: this.editForm.get(['msisdn']).value,
      cmd: this.editForm.get(['cmd']).value,
      descriptions: this.editForm.get(['descriptions']).value,
      price: this.editForm.get(['price']).value,
      datetime: this.editForm.get(['datetime']).value != null ? moment(this.editForm.get(['datetime']).value, DATE_TIME_FORMAT) : undefined,
      result: this.editForm.get(['result']).value,
      trans_id: this.editForm.get(['trans_id']).value,
      source: this.editForm.get(['source']).value,
      sub_type: this.editForm.get(['sub_type']).value,
      systemid: this.editForm.get(['systemid']).value,
      serviceid: this.editForm.get(['serviceid']).value,
      channel: this.editForm.get(['channel']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITransaction_logs>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
