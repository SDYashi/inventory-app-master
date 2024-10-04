import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagedailogComponent } from './imagedailog.component';

describe('ImagedailogComponent', () => {
  let component: ImagedailogComponent;
  let fixture: ComponentFixture<ImagedailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagedailogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImagedailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
