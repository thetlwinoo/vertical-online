export interface IShoppingCartItems {
    id?: number;
    quantity?: number;
    productProductName?: string;
    productId?: number;
    product?: any;
    cartId?: number;
}

export class ShoppingCartItems implements IShoppingCartItems {
    constructor(
        public id?: number,
        public quantity?: number,
        public productProductName?: string,
        public productId?: number,
        public product?: any,
        public cartId?: number
    ) { }
}
