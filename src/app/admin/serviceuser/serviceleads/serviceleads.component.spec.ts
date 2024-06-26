import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceleadsComponent } from './serviceleads.component';

describe('ServiceleadsComponent', () => {
  let component: ServiceleadsComponent;
  let fixture: ComponentFixture<ServiceleadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceleadsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceleadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
