import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentdetailsComponent } from './investmentdetails.component';

describe('InvestmentdetailsComponent', () => {
  let component: InvestmentdetailsComponent;
  let fixture: ComponentFixture<InvestmentdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
