import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FounderdetailsComponent } from './founderdetails.component';

describe('FounderdetailsComponent', () => {
  let component: FounderdetailsComponent;
  let fixture: ComponentFixture<FounderdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FounderdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FounderdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
