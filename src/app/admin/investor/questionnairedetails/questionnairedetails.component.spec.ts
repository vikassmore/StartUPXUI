import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnairedetailsComponent } from './questionnairedetails.component';

describe('QuestionnairedetailsComponent', () => {
  let component: QuestionnairedetailsComponent;
  let fixture: ComponentFixture<QuestionnairedetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuestionnairedetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionnairedetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
