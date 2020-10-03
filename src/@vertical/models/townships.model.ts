import { Moment } from 'moment';

export interface ITownships {
  id?: number;
  name?: string;
  description?: string;
  localization?: any;
  validFrom?: Moment;
  validTo?: Moment;
  cityName?: string;
  cityId?: number;
}

export class Townships implements ITownships {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public localization?: any,
    public validFrom?: Moment,
    public validTo?: Moment,
    public cityName?: string,
    public cityId?: number
  ) {}
}
