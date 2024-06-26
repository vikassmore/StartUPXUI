import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddserviceuserComponent } from './addserviceuser.component';

describe('AddserviceuserComponent', () => {
  let component: AddserviceuserComponent;
  let fixture: ComponentFixture<AddserviceuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddserviceuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddserviceuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
