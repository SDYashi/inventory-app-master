import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvUserProfileComponent } from './inv-user-profile.component';

describe('InvUserProfileComponent', () => {
  let component: InvUserProfileComponent;
  let fixture: ComponentFixture<InvUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvUserProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
