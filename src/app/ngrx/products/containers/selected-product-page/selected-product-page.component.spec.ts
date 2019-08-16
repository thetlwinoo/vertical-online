import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedProductPageComponent } from './selected-product-page.component';

describe('SelectedProductPageComponent', () => {
  let component: SelectedProductPageComponent;
  let fixture: ComponentFixture<SelectedProductPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedProductPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
