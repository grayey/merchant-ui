import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SecureRedirectComponent } from './secure-redirect.component';

describe('SecureRedirectComponent', () => {
  let component: SecureRedirectComponent;
  let fixture: ComponentFixture<SecureRedirectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SecureRedirectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SecureRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
