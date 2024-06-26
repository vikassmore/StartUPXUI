import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditfounderdetailsComponent } from './editfounderdetails.component';

describe('EditfounderdetailsComponent', () => {
  let component: EditfounderdetailsComponent;
  let fixture: ComponentFixture<EditfounderdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditfounderdetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditfounderdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
