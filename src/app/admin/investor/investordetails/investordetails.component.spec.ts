import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestordetailsComponent } from './investordetails.component';

describe('InvestordetailsComponent', () => {
  let component: InvestordetailsComponent;
  let fixture: ComponentFixture<InvestordetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestordetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestordetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
