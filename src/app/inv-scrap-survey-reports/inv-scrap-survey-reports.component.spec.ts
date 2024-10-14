import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvScrapSurveyReportsComponent } from './inv-scrap-survey-reports.component';

describe('InvScrapSurveyReportsComponent', () => {
  let component: InvScrapSurveyReportsComponent;
  let fixture: ComponentFixture<InvScrapSurveyReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvScrapSurveyReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvScrapSurveyReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
