import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddfundingComponent } from './addfunding.component';

describe('AddfundingComponent', () => {
  let component: AddfundingComponent;
  let fixture: ComponentFixture<AddfundingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddfundingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddfundingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
