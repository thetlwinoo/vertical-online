import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterFixedComponent } from './footer-fixed.component';

describe('FooterFixedComponent', () => {
  let component: FooterFixedComponent;
  let fixture: ComponentFixture<FooterFixedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterFixedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterFixedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
