import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchageOrderAddComponent } from './purchage-order-add.component';

describe('PurchageOrderAddComponent', () => {
  let component: PurchageOrderAddComponent;
  let fixture: ComponentFixture<PurchageOrderAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchageOrderAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchageOrderAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
