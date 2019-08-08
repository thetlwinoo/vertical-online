import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandZoneComponent } from './brand-zone.component';

describe('BrandZoneComponent', () => {
  let component: BrandZoneComponent;
  let fixture: ComponentFixture<BrandZoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandZoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
