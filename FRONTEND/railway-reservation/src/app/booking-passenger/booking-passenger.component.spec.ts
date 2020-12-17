import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingPassengerComponent } from './booking-passenger.component';

describe('BookingPassengerComponent', () => {
  let component: BookingPassengerComponent;
  let fixture: ComponentFixture<BookingPassengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingPassengerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingPassengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
