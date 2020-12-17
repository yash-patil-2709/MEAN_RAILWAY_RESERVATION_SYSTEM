import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketgenComponent } from './ticketgen.component';

describe('TicketgenComponent', () => {
  let component: TicketgenComponent;
  let fixture: ComponentFixture<TicketgenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketgenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketgenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
