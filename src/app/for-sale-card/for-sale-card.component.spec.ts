import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForSaleCardComponent } from './for-sale-card.component';

describe('ForSaleCardComponent', () => {
  let component: ForSaleCardComponent;
  let fixture: ComponentFixture<ForSaleCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForSaleCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForSaleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
