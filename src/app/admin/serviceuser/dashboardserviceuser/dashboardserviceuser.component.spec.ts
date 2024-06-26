import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardserviceuserComponent } from './dashboardserviceuser.component';

describe('DashboardserviceuserComponent', () => {
  let component: DashboardserviceuserComponent;
  let fixture: ComponentFixture<DashboardserviceuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardserviceuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardserviceuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
