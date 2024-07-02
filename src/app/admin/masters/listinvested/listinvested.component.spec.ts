import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListinvestedComponent } from './listinvested.component';

describe('ListinvestedComponent', () => {
  let component: ListinvestedComponent;
  let fixture: ComponentFixture<ListinvestedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListinvestedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListinvestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
