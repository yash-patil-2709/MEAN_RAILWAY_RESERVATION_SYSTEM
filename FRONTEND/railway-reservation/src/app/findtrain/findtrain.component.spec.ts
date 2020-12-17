import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindtrainComponent } from './findtrain.component';

describe('FindtrainComponent', () => {
  let component: FindtrainComponent;
  let fixture: ComponentFixture<FindtrainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindtrainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindtrainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
