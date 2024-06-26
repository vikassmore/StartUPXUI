import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListrequestofferingComponent } from './listrequestoffering.component';

describe('ListrequestofferingComponent', () => {
  let component: ListrequestofferingComponent;
  let fixture: ComponentFixture<ListrequestofferingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListrequestofferingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListrequestofferingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
