import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartupdetailsComponent } from './startupdetails.component';

describe('StartupdetailsComponent', () => {
  let component: StartupdetailsComponent;
  let fixture: ComponentFixture<StartupdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartupdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartupdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
