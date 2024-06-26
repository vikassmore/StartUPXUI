import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentprofileComponent } from './investmentprofile.component';

describe('InvestmentprofileComponent', () => {
  let component: InvestmentprofileComponent;
  let fixture: ComponentFixture<InvestmentprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestmentprofileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
