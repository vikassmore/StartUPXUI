import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclineserviceComponent } from './declineservice.component';

describe('DeclineserviceComponent', () => {
  let component: DeclineserviceComponent;
  let fixture: ComponentFixture<DeclineserviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeclineserviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclineserviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
