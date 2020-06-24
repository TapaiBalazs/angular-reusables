import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageTricksShowcaseComponent } from './image-tricks-showcase.component';

describe('ImageTricksShowcaseComponent', () => {
  let component: ImageTricksShowcaseComponent;
  let fixture: ComponentFixture<ImageTricksShowcaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageTricksShowcaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageTricksShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
