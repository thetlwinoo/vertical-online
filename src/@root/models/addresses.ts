export interface IAddresses {
    id?: number;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    postalCode?: string;
    defaultInd?: boolean;
    activeInd?: boolean;
    stateProvinceStateProvinceName?: string;
    stateProvinceId?: number;
}

export class Addresses implements IAddresses {
    constructor(
        public id?: number,
        public addressLine1?: string,
        public addressLine2?: string,
        public city?: string,
        public postalCode?: string,
        public defaultInd?: boolean,
        public activeInd?: boolean,
        public stateProvinceStateProvinceName?: string,
        public stateProvinceId?: number
    ) {
        this.defaultInd = this.defaultInd || false;
        this.activeInd = this.activeInd || false;
    }
}
