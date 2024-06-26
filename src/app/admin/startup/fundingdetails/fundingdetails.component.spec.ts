import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundingdetailsComponent } from './fundingdetails.component';

describe('FundingdetailsComponent', () => {
  let component: FundingdetailsComponent;
  let fixture: ComponentFixture<FundingdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundingdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundingdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
