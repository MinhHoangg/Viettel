import { Moment } from 'moment';

export interface ISUBS_DAILY {
  id?: number;
  systemID?: string;
  userID?: string;
  serviceID?: string;
  commandCode?: string;
  info?: string;
  receiveTime?: string;
  isPause?: number;
  chanel?: string;
  nextChargeDate?: Moment;
  lastChargeDate?: Moment;
  price?: number;
  offTime?: string;
  offReason?: string;
  typeRegister?: string;
}

export class SUBS_DAILY implements ISUBS_DAILY {
  constructor(
    public id?: number,
    public systemID?: string,
    public userID?: string,
    public serviceID?: string,
    public commandCode?: string,
    public info?: string,
    public receiveTime?: string,
    public isPause?: number,
    public chanel?: string,
    public nextChargeDate?: Moment,
    public lastChargeDate?: Moment,
    public price?: number,
    public offTime?: string,
    public offReason?: string,
    public typeRegister?: string
  ) {}
}
