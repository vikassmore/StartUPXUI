import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditserviceuserComponent } from './editserviceuser.component';

describe('EditserviceuserComponent', () => {
  let component: EditserviceuserComponent;
  let fixture: ComponentFixture<EditserviceuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditserviceuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditserviceuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
