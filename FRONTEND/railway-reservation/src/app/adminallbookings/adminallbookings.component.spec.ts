import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminallbookingsComponent } from './adminallbookings.component';

describe('AdminallbookingsComponent', () => {
  let component: AdminallbookingsComponent;
  let fixture: ComponentFixture<AdminallbookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminallbookingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminallbookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
