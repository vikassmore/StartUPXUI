import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListfounderdetailsComponent } from './listfounderdetails.component';

describe('ListfounderdetailsComponent', () => {
  let component: ListfounderdetailsComponent;
  let fixture: ComponentFixture<ListfounderdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListfounderdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListfounderdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
