import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyComponentHomeComponent } from './my-component-home.component';

describe('MyComponentHomeComponent', () => {
  let component: MyComponentHomeComponent;
  let fixture: ComponentFixture<MyComponentHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyComponentHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyComponentHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
