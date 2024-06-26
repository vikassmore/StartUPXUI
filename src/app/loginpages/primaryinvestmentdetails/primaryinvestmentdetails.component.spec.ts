import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryinvestmentdetailsComponent } from './primaryinvestmentdetails.component';

describe('PrimaryinvestmentdetailsComponent', () => {
  let component: PrimaryinvestmentdetailsComponent;
  let fixture: ComponentFixture<PrimaryinvestmentdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimaryinvestmentdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryinvestmentdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
