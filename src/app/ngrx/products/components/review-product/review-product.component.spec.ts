import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewProductComponent } from './review-product.component';

describe('ReviewProductComponent', () => {
  let component: ReviewProductComponent;
  let fixture: ComponentFixture<ReviewProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
