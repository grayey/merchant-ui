import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessFailureRateComponent } from './success-failure-rate.component';

describe('SuccessFailureRateComponent', () => {
  let component: SuccessFailureRateComponent;
  let fixture: ComponentFixture<SuccessFailureRateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessFailureRateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessFailureRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
