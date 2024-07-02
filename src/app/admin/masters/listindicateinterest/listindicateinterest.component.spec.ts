import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListindicateinterestComponent } from './listindicateinterest.component';

describe('ListindicateinterestComponent', () => {
  let component: ListindicateinterestComponent;
  let fixture: ComponentFixture<ListindicateinterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListindicateinterestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListindicateinterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
