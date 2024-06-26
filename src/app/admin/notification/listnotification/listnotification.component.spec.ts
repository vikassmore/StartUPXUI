import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListnotificationComponent } from './listnotification.component';

describe('ListnotificationComponent', () => {
  let component: ListnotificationComponent;
  let fixture: ComponentFixture<ListnotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListnotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListnotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
