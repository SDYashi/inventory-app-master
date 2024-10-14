import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryReportScrapComponent } from './inventory-report-scrap.component';

describe('InventoryReportScrapComponent', () => {
  let component: InventoryReportScrapComponent;
  let fixture: ComponentFixture<InventoryReportScrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryReportScrapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryReportScrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
