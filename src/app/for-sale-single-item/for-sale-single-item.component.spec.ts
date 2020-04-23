import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForSaleSingleItemComponent } from './for-sale-single-item.component';

describe('ForSaleSingleItemComponent', () => {
  let component: ForSaleSingleItemComponent;
  let fixture: ComponentFixture<ForSaleSingleItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForSaleSingleItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForSaleSingleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
