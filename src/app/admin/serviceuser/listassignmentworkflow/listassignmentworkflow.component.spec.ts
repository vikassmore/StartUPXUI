import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListassignmentworkflowComponent } from './listassignmentworkflow.component';

describe('ListassignmentworkflowComponent', () => {
  let component: ListassignmentworkflowComponent;
  let fixture: ComponentFixture<ListassignmentworkflowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListassignmentworkflowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListassignmentworkflowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
