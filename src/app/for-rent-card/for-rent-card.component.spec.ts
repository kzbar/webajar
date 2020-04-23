import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForRentCardComponent } from './for-rent-card.component';

describe('ForRentCardComponent', () => {
  let component: ForRentCardComponent;
  let fixture: ComponentFixture<ForRentCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForRentCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForRentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
