import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyinterestComponent } from './companyinterest.component';

describe('CompanyinterestComponent', () => {
  let component: CompanyinterestComponent;
  let fixture: ComponentFixture<CompanyinterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyinterestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyinterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
