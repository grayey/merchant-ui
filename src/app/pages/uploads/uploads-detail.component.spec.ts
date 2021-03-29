import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadsDetailComponent } from './uploads-detail.component';

describe('UploadsDetailComponent', () => {
  let component: UploadsDetailComponent;
  let fixture: ComponentFixture<UploadsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadsDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
