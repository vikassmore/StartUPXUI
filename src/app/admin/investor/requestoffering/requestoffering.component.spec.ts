import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestofferingComponent } from './requestoffering.component';

describe('RequestofferingComponent', () => {
  let component: RequestofferingComponent;
  let fixture: ComponentFixture<RequestofferingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestofferingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestofferingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
