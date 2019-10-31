import { Moment } from 'moment';

export interface ITransaction_logs {
  id?: number;
  msisdn?: string;
  cmd?: string;
  descriptions?: string;
  price?: number;
  datetime?: Moment;
  result?: number;
  trans_id?: number;
  source?: string;
  sub_type?: string;
  systemid?: string;
  serviceid?: string;
  channel?: string;
}

export class Transaction_logs implements ITransaction_logs {
  constructor(
    public id?: number,
    public msisdn?: string,
    public cmd?: string,
    public descriptions?: string,
    public price?: number,
    public datetime?: Moment,
    public result?: number,
    public trans_id?: number,
    public source?: string,
    public sub_type?: string,
    public systemid?: string,
    public serviceid?: string,
    public channel?: string
  ) {}
}
