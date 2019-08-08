import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCompareComponent } from './my-compare.component';

describe('MyCompareComponent', () => {
  let component: MyCompareComponent;
  let fixture: ComponentFixture<MyCompareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCompareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCompareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
