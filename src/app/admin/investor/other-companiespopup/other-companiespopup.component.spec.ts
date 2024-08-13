import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherCompaniespopupComponent } from './other-companiespopup.component';

describe('OtherCompaniespopupComponent', () => {
  let component: OtherCompaniespopupComponent;
  let fixture: ComponentFixture<OtherCompaniespopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OtherCompaniespopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherCompaniespopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
