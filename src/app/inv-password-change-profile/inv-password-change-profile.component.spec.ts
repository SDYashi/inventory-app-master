import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvPasswordChangeProfileComponent } from './inv-password-change-profile.component';

describe('InvPasswordChangeProfileComponent', () => {
  let component: InvPasswordChangeProfileComponent;
  let fixture: ComponentFixture<InvPasswordChangeProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvPasswordChangeProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvPasswordChangeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
