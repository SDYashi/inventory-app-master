import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryAssignHistoryComponent } from './inventory-assign-history.component';

describe('InventoryAssignHistoryComponent', () => {
  let component: InventoryAssignHistoryComponent;
  let fixture: ComponentFixture<InventoryAssignHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryAssignHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryAssignHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
