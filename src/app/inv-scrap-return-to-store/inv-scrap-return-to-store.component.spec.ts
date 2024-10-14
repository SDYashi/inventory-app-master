import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvScrapReturnToStoreComponent } from './inv-scrap-return-to-store.component';

describe('InvScrapReturnToStoreComponent', () => {
  let component: InvScrapReturnToStoreComponent;
  let fixture: ComponentFixture<InvScrapReturnToStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvScrapReturnToStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvScrapReturnToStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
