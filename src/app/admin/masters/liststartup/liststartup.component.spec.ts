import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListstartupComponent } from './liststartup.component';

describe('ListstartupComponent', () => {
  let component: ListstartupComponent;
  let fixture: ComponentFixture<ListstartupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListstartupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListstartupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
