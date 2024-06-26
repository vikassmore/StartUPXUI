import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaccreditedinvestorComponent } from './listaccreditedinvestor.component';

describe('ListaccreditedinvestorComponent', () => {
  let component: ListaccreditedinvestorComponent;
  let fixture: ComponentFixture<ListaccreditedinvestorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaccreditedinvestorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaccreditedinvestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
