import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorisationShowcaseComponent } from './authorisation-showcase.component';

describe('AuthorisationShowcaseComponent', () => {
  let component: AuthorisationShowcaseComponent;
  let fixture: ComponentFixture<AuthorisationShowcaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthorisationShowcaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorisationShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
