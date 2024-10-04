import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecieveInventoryComponent } from './recieve-inventory.component';

describe('RecieveInventoryComponent', () => {
  let component: RecieveInventoryComponent;
  let fixture: ComponentFixture<RecieveInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecieveInventoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecieveInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
