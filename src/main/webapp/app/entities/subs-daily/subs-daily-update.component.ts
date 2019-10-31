import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { ISUBS_DAILY, SUBS_DAILY } from 'app/shared/model/subs-daily.model';
import { SUBS_DAILYService } from './subs-daily.service';

@Component({
  selector: 'jhi-subs-daily-update',
  templateUrl: './subs-daily-update.component.html'
})
export class SUBS_DAILYUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    systemID: [null, [Validators.maxLength(15)]],
    userID: [null, [Validators.maxLength(15)]],
    serviceID: [null, [Validators.maxLength(15)]],
    commandCode: [],
    info: [null, [Validators.maxLength(50)]],
    receiveTime: [null, [Validators.maxLength(35)]],
    isPause: [],
    chanel: [null, [Validators.maxLength(15)]],
    nextChargeDate: [],
    lastChargeDate: [],
    price: [],
    offTime: [null, [Validators.maxLength(35)]],
    offReason: [null, [Validators.maxLength(20)]],
    typeRegister: [null, [Validators.maxLength(20)]]
  });

  constructor(protected sUBS_DAILYService: SUBS_DAILYService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ sUBS_DAILY }) => {
      this.updateForm(sUBS_DAILY);
    });
  }

  updateForm(sUBS_DAILY: ISUBS_DAILY) {
    this.editForm.patchValue({
      id: sUBS_DAILY.id,
      systemID: sUBS_DAILY.systemID,
      userID: sUBS_DAILY.userID,
      serviceID: sUBS_DAILY.serviceID,
      commandCode: sUBS_DAILY.commandCode,
      info: sUBS_DAILY.info,
      receiveTime: sUBS_DAILY.receiveTime,
      isPause: sUBS_DAILY.isPause,
      chanel: sUBS_DAILY.chanel,
      nextChargeDate: sUBS_DAILY.nextChargeDate != null ? sUBS_DAILY.nextChargeDate.format(DATE_TIME_FORMAT) : null,
      lastChargeDate: sUBS_DAILY.lastChargeDate != null ? sUBS_DAILY.lastChargeDate.format(DATE_TIME_FORMAT) : null,
      price: sUBS_DAILY.price,
      offTime: sUBS_DAILY.offTime,
      offReason: sUBS_DAILY.offReason,
      typeRegister: sUBS_DAILY.typeRegister
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const sUBS_DAILY = this.createFromForm();
    if (sUBS_DAILY.id !== undefined) {
      this.subscribeToSaveResponse(this.sUBS_DAILYService.update(sUBS_DAILY));
    } else {
      this.subscribeToSaveResponse(this.sUBS_DAILYService.create(sUBS_DAILY));
    }
  }

  private createFromForm(): ISUBS_DAILY {
    return {
      ...new SUBS_DAILY(),
      id: this.editForm.get(['id']).value,
      systemID: this.editForm.get(['systemID']).value,
      userID: this.editForm.get(['userID']).value,
      serviceID: this.editForm.get(['serviceID']).value,
      commandCode: this.editForm.get(['commandCode']).value,
      info: this.editForm.get(['info']).value,
      receiveTime: this.editForm.get(['receiveTime']).value,
      isPause: this.editForm.get(['isPause']).value,
      chanel: this.editForm.get(['chanel']).value,
      nextChargeDate:
        this.editForm.get(['nextChargeDate']).value != null
          ? moment(this.editForm.get(['nextChargeDate']).value, DATE_TIME_FORMAT)
          : undefined,
      lastChargeDate:
        this.editForm.get(['lastChargeDate']).value != null
          ? moment(this.editForm.get(['lastChargeDate']).value, DATE_TIME_FORMAT)
          : undefined,
      price: this.editForm.get(['price']).value,
      offTime: this.editForm.get(['offTime']).value,
      offReason: this.editForm.get(['offReason']).value,
      typeRegister: this.editForm.get(['typeRegister']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISUBS_DAILY>>) {
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
