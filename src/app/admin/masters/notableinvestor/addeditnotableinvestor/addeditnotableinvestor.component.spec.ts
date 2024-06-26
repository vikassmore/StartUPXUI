import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddeditnotableinvestorComponent } from './addeditnotableinvestor.component';

describe('AddeditnotableinvestorComponent', () => {
  let component: AddeditnotableinvestorComponent;
  let fixture: ComponentFixture<AddeditnotableinvestorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddeditnotableinvestorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddeditnotableinvestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
