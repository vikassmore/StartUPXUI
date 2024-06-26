import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DenyserviceuserComponent } from './denyserviceuser.component';

describe('DenyserviceuserComponent', () => {
  let component: DenyserviceuserComponent;
  let fixture: ComponentFixture<DenyserviceuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DenyserviceuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DenyserviceuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
