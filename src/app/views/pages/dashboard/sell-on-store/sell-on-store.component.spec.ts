import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellOnStoreComponent } from './sell-on-store.component';

describe('SellOnStoreComponent', () => {
  let component: SellOnStoreComponent;
  let fixture: ComponentFixture<SellOnStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellOnStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellOnStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
