import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListprofilemanagementComponent } from './listprofilemanagement.component';

describe('ListprofilemanagementComponent', () => {
  let component: ListprofilemanagementComponent;
  let fixture: ComponentFixture<ListprofilemanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListprofilemanagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListprofilemanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
