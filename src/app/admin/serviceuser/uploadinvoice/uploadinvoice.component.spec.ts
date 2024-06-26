import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadinvoiceComponent } from './uploadinvoice.component';

describe('UploadinvoiceComponent', () => {
  let component: UploadinvoiceComponent;
  let fixture: ComponentFixture<UploadinvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadinvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadinvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
