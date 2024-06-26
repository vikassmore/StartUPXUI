import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Notapprove1Component } from './notapprove1.component';

describe('Notapprove1Component', () => {
  let component: Notapprove1Component;
  let fixture: ComponentFixture<Notapprove1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Notapprove1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Notapprove1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
