import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRefundsComponent } from './create-refunds.component';

describe('CreateRefundsComponent', () => {
  let component: CreateRefundsComponent;
  let fixture: ComponentFixture<CreateRefundsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRefundsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRefundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
