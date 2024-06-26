import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrustedcontactComponent } from './trustedcontact.component';

describe('TrustedcontactComponent', () => {
  let component: TrustedcontactComponent;
  let fixture: ComponentFixture<TrustedcontactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrustedcontactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrustedcontactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
