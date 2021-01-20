import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafePipesDisplayComponent } from './safe-pipes-display.component';

describe('SafePipesDisplayComponent', () => {
  let component: SafePipesDisplayComponent;
  let fixture: ComponentFixture<SafePipesDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafePipesDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SafePipesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
