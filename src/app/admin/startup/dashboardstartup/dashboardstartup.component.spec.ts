import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardstartupComponent } from './dashboardstartup.component';

describe('DashboardstartupComponent', () => {
  let component: DashboardstartupComponent;
  let fixture: ComponentFixture<DashboardstartupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardstartupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardstartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
