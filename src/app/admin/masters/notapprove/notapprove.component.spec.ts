import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotapproveComponent } from './notapprove.component';

describe('NotapproveComponent', () => {
  let component: NotapproveComponent;
  let fixture: ComponentFixture<NotapproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotapproveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotapproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
