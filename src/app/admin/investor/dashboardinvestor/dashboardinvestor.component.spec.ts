import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardinvestorComponent } from './dashboardinvestor.component';

describe('DashboardinvestorComponent', () => {
  let component: DashboardinvestorComponent;
  let fixture: ComponentFixture<DashboardinvestorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardinvestorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardinvestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
