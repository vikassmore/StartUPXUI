import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListmyservicesComponent } from './listmyservices.component';

describe('ListmyservicesComponent', () => {
  let component: ListmyservicesComponent;
  let fixture: ComponentFixture<ListmyservicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListmyservicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListmyservicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
