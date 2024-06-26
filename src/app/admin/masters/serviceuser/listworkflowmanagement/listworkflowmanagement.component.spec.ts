import { ComponentFixture, TestBed } from '@angular/core/testing';

import { listworkflowmanagement } from './listworkflowmanagement.component';

describe('ListcasemanagementComponent', () => {
  let component: listworkflowmanagement;
  let fixture: ComponentFixture<listworkflowmanagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ listworkflowmanagement ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(listworkflowmanagement);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
