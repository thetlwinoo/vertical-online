import { ICompareProducts } from './compare-products.model';

export interface ICompares {
  id?: number;
  compareUserId?: number;
  compareLists?: ICompareProducts[];
}

export class Compares implements ICompares {
  constructor(public id?: number, public compareUserId?: number, public compareLists?: ICompareProducts[]) {}
}
