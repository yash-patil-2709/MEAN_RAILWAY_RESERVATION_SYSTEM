import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCancelBookingComponent } from './view-cancel-booking.component';

describe('ViewCancelBookingComponent', () => {
  let component: ViewCancelBookingComponent;
  let fixture: ComponentFixture<ViewCancelBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCancelBookingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCancelBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
