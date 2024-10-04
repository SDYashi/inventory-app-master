import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchageOrderUpdateComponent } from './purchage-order-update.component';

describe('PurchageOrderUpdateComponent', () => {
  let component: PurchageOrderUpdateComponent;
  let fixture: ComponentFixture<PurchageOrderUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchageOrderUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchageOrderUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
