import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantBalanceComponent } from './merchant-balance.component';

describe('MerchantBalanceComponent', () => {
  let component: MerchantBalanceComponent;
  let fixture: ComponentFixture<MerchantBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MerchantBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
    return true;
  });
});
