import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadRightOnlyComponent } from './read-right-only.component';

describe('ReadRightOnlyComponent', () => {
  let component: ReadRightOnlyComponent;
  let fixture: ComponentFixture<ReadRightOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadRightOnlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadRightOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
