import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySubcategoryAddComponent } from './category-subcategory-add.component';

describe('CategorySubcategoryAddComponent', () => {
  let component: CategorySubcategoryAddComponent;
  let fixture: ComponentFixture<CategorySubcategoryAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorySubcategoryAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorySubcategoryAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
