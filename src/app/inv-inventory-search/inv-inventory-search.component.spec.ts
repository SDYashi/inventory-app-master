import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvInventorySearchComponent } from './inv-inventory-search.component';

describe('InvInventorySearchComponent', () => {
  let component: InvInventorySearchComponent;
  let fixture: ComponentFixture<InvInventorySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvInventorySearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvInventorySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
