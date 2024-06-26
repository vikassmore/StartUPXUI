import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpolicyComponent } from './listpolicy.component';

describe('ListpolicyComponent', () => {
  let component: ListpolicyComponent;
  let fixture: ComponentFixture<ListpolicyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListpolicyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListpolicyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
