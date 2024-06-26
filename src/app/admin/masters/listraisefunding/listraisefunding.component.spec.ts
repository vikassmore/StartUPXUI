import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListraisefundingComponent } from './listraisefunding.component';

describe('ListraisefundingComponent', () => {
  let component: ListraisefundingComponent;
  let fixture: ComponentFixture<ListraisefundingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListraisefundingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListraisefundingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
