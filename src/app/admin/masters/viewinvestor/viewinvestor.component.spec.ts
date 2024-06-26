import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewinvestorComponent } from './viewinvestor.component';

describe('ViewinvestorComponent', () => {
  let component: ViewinvestorComponent;
  let fixture: ComponentFixture<ViewinvestorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewinvestorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewinvestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
