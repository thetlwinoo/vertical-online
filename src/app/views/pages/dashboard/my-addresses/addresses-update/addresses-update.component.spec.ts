import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressesUpdateComponent } from './addresses-update.component';

describe('AddressesUpdateComponent', () => {
  let component: AddressesUpdateComponent;
  let fixture: ComponentFixture<AddressesUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressesUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressesUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
