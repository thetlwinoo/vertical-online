import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyDiscoverComponent } from './daily-discover.component';

describe('DailyDiscoverComponent', () => {
  let component: DailyDiscoverComponent;
  let fixture: ComponentFixture<DailyDiscoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyDiscoverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyDiscoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
