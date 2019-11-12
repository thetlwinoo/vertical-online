import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GhostItemComponent } from './ghost-item.component';

describe('GhostItemComponent', () => {
  let component: GhostItemComponent;
  let fixture: ComponentFixture<GhostItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GhostItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GhostItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
