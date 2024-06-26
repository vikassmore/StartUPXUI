import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitinterestComponent } from './submitinterest.component';

describe('SubmitinterestComponent', () => {
  let component: SubmitinterestComponent;
  let fixture: ComponentFixture<SubmitinterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubmitinterestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitinterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
