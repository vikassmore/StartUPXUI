import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListfaqComponent } from './listfaq.component';

describe('ListfaqComponent', () => {
  let component: ListfaqComponent;
  let fixture: ComponentFixture<ListfaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListfaqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListfaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
