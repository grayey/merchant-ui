import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequeryTransactionsComponent } from './requery-transactions.component';

describe('RequeryTransactionsComponent', () => {
  let component: RequeryTransactionsComponent;
  let fixture: ComponentFixture<RequeryTransactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequeryTransactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequeryTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
