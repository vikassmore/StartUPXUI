import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfundingdetailsComponent } from './addfundingdetails.component';

describe('AddfundingdetailsComponent', () => {
  let component: AddfundingdetailsComponent;
  let fixture: ComponentFixture<AddfundingdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddfundingdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddfundingdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
