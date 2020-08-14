import { Moment } from 'moment';

export interface ReviewsProps {
  id: number;
  completedReview: boolean;
  customerReviewedOn: Moment;
  deliveryRating: number;
  deliveryReview: string;
  reviewAsAnonymous: boolean;
  sellerRating: number;
  sellerReview: string;
  lineReviewList: ReviewLinesProps[];
}

export interface ReviewLinesProps {
  id: number;
  lineRating: number;
  lineReview: string;
  reviewPhoto: number;
}
