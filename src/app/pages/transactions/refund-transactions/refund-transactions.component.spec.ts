import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefundTransactionsComponent } from './refund-transactions.component';

describe('RefundTransactionsComponent', () => {
  let component: RefundTransactionsComponent;
  let fixture: ComponentFixture<RefundTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefundTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RefundTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
