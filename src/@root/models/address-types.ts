export interface IAddressTypes {
    id?: number;
    addressTypeName?: string;
}

export class AddressTypes implements IAddressTypes {
    constructor(public id?: number, public addressTypeName?: string) {}
}