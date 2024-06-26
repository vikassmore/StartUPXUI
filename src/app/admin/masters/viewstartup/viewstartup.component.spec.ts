import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewstartupComponent } from './viewstartup.component';

describe('ViewstartupComponent', () => {
  let component: ViewstartupComponent;
  let fixture: ComponentFixture<ViewstartupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewstartupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewstartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
