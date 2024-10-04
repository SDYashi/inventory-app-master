import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailsDailogComponent } from './item-details-dailog.component';

describe('ItemDetailsDailogComponent', () => {
  let component: ItemDetailsDailogComponent;
  let fixture: ComponentFixture<ItemDetailsDailogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemDetailsDailogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemDetailsDailogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
