import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueInventoryEditComponent } from './issue-inventory-edit.component';

describe('IssueInventoryEditComponent', () => {
  let component: IssueInventoryEditComponent;
  let fixture: ComponentFixture<IssueInventoryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssueInventoryEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssueInventoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
