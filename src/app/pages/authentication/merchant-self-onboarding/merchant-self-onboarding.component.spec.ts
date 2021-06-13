import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantSelfOnboardingComponent } from './merchant-self-onboarding.component';

describe('MerchantSelfOnboardingComponent', () => {
  let component: MerchantSelfOnboardingComponent;
  let fixture: ComponentFixture<MerchantSelfOnboardingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantSelfOnboardingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantSelfOnboardingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
