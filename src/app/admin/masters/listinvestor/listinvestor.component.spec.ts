import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListinvestorComponent } from './listinvestor.component';

describe('ListinvestorComponent', () => {
  let component: ListinvestorComponent;
  let fixture: ComponentFixture<ListinvestorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListinvestorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListinvestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
