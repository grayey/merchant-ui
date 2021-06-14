import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfOnboardRequestsComponent } from './self-onboard-requests.component';

describe('SelfOnboardRequestsComponent', () => {
  let component: SelfOnboardRequestsComponent;
  let fixture: ComponentFixture<SelfOnboardRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfOnboardRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfOnboardRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
