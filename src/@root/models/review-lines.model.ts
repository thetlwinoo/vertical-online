export interface IReviewLines {
    id?: number;
    productRating?: number;
    productReview?: string;
    sellerRating?: number;
    sellerReview?: string;
    deliveryRating?: number;
    deliveryReview?: string;
    photoContentType?: string;
    photo?: any;
    productProductName?: string;
    productId?: number;
    product?: any;
    reviewId?: number;
}

export class ReviewLines implements IReviewLines {
    constructor(
        public id?: number,
        public productRating?: number,
        public productReview?: string,
        public sellerRating?: number,
        public sellerReview?: string,
        public deliveryRating?: number,
        public deliveryReview?: string,
        public photoContentType?: string,
        public photo?: any,
        public productProductName?: string,
        public productId?: number,
        public product?: any,
        public reviewId?: number
    ) { }
}
