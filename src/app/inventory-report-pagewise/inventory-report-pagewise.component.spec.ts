import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryReportPagewiseComponent } from './inventory-report-pagewise.component';

describe('InventoryReportPagewiseComponent', () => {
  let component: InventoryReportPagewiseComponent;
  let fixture: ComponentFixture<InventoryReportPagewiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventoryReportPagewiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventoryReportPagewiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
