import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'completedReviews'
})
export class CompletedReviewsPipe implements PipeTransform {
    transform(array, completedInd) {        
        if (array && array.length > 0) {
            return array.filter(data => {                
                if(data.orderReview){
                    return data.orderReview.completedReview == completedInd;
                }
                return !completedInd;
                
            });
        }
        return [];
    }
}
