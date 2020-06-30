import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RootSharedModule } from '@eps/shared.module';
import { MyReviewsComponent, myReviewsRoute, ReviewDetailsComponent } from './';
import { ReviewUpdateComponent } from './review-update/review-update.component';
import { MyReviewsFilterPipe } from './my-reviews-filter.pipe';

const ENTITY_STATES = [...myReviewsRoute];

@NgModule({
  declarations: [MyReviewsComponent, ReviewDetailsComponent, ReviewUpdateComponent, MyReviewsFilterPipe],
  imports: [CommonModule, RouterModule.forChild(ENTITY_STATES), RootSharedModule],
  entryComponents: [MyReviewsComponent, ReviewDetailsComponent],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [MyReviewsComponent],
})
export class MyReviewsModule {}
