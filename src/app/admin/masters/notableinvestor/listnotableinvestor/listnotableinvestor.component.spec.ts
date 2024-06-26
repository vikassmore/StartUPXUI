import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListnotableinvestorComponent } from './listnotableinvestor.component';

describe('ListnotableinvestorComponent', () => {
  let component: ListnotableinvestorComponent;
  let fixture: ComponentFixture<ListnotableinvestorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListnotableinvestorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListnotableinvestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
