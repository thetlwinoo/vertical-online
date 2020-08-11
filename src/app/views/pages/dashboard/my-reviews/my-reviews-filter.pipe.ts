import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reviewsFilter',
})
export class MyReviewsFilterPipe implements PipeTransform {
  transform(list: any[], completedReview: boolean): any[] {
    return list.filter(item => item.completedReview === completedReview);
  }
}
