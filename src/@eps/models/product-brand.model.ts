export interface IProductBrand {
  id?: number;
  name?: string;
  thumbnailUrl?: string;
  supplierName?: string;
  supplierId?: number;
}

export class ProductBrand implements IProductBrand {
  constructor(
    public id?: number,
    public name?: string,
    public thumbnailUrl?: string,
    public supplierName?: string,
    public supplierId?: number
  ) {}
}
