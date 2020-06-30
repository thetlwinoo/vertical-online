import { Moment } from 'moment';
import { IStockItems } from './stock-items.model';

export interface IProducts {
  id?: number;
  name?: string;
  handle?: string;
  searchDetails?: string;
  productNumber?: string;
  sellCount?: number;
  productDetails?: any;
  totalWishlist?: number;
  totalStars?: number;
  discountedPercentage?: number;
  preferredInd?: boolean;
  availableDeliveryInd?: boolean;
  activeInd?: boolean;
  questionsAboutProductInd?: boolean;
  lastEditedBy?: string;
  lastEditedWhen?: Moment;
  releaseDate?: Moment;
  availableDate?: Moment;
  productDocumentId?: number;
  stockItemLists?: IStockItems[];
  supplierName?: string;
  supplierId?: number;
  productCategoryName?: string;
  productCategoryId?: number;
  productBrandName?: string;
  productBrandId?: number;
}

export class Products implements IProducts {
  constructor(
    public id?: number,
    public name?: string,
    public handle?: string,
    public searchDetails?: string,
    public productNumber?: string,
    public sellCount?: number,
    public productDetails?: any,
    public totalWishlist?: number,
    public totalStars?: number,
    public discountedPercentage?: number,
    public preferredInd?: boolean,
    public availableDeliveryInd?: boolean,
    public activeInd?: boolean,
    public questionsAboutProductInd?: boolean,
    public lastEditedBy?: string,
    public lastEditedWhen?: Moment,
    public releaseDate?: Moment,
    public availableDate?: Moment,
    public productDocumentId?: number,
    public stockItemLists?: IStockItems[],
    public supplierName?: string,
    public supplierId?: number,
    public productCategoryName?: string,
    public productCategoryId?: number,
    public productBrandName?: string,
    public productBrandId?: number
  ) {
    this.preferredInd = this.preferredInd || false;
    this.availableDeliveryInd = this.availableDeliveryInd || false;
    this.activeInd = this.activeInd || false;
    this.questionsAboutProductInd = this.questionsAboutProductInd || false;
  }
}
