import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddaccreditedinvestorComponent } from './addaccreditedinvestor.component';

describe('AddaccreditedinvestorComponent', () => {
  let component: AddaccreditedinvestorComponent;
  let fixture: ComponentFixture<AddaccreditedinvestorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddaccreditedinvestorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddaccreditedinvestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
