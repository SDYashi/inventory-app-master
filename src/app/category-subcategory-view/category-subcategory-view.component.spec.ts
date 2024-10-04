import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySubcategoryViewComponent } from './category-subcategory-view.component';

describe('CategorySubcategoryViewComponent', () => {
  let component: CategorySubcategoryViewComponent;
  let fixture: ComponentFixture<CategorySubcategoryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorySubcategoryViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorySubcategoryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
