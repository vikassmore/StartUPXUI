import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyinvestComponent } from './companyinvest.component';

describe('CompanyinvestComponent', () => {
  let component: CompanyinvestComponent;
  let fixture: ComponentFixture<CompanyinvestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyinvestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyinvestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
