import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListserviceuserComponent } from './listserviceuser.component';

describe('ListserviceuserComponent', () => {
  let component: ListserviceuserComponent;
  let fixture: ComponentFixture<ListserviceuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListserviceuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListserviceuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
