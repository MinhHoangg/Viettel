import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISUBS_DAILY } from 'app/shared/model/subs-daily.model';

@Component({
  selector: 'jhi-subs-daily-detail',
  templateUrl: './subs-daily-detail.component.html'
})
export class SUBS_DAILYDetailComponent implements OnInit {
  sUBS_DAILY: ISUBS_DAILY;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ sUBS_DAILY }) => {
      this.sUBS_DAILY = sUBS_DAILY;
    });
  }

  previousState() {
    window.history.back();
  }
}
