import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentopportunityComponent } from './investmentopportunity.component';

describe('InvestmentopportunityComponent', () => {
  let component: InvestmentopportunityComponent;
  let fixture: ComponentFixture<InvestmentopportunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentopportunityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentopportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
