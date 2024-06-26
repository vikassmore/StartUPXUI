import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsectorComponent } from './listsector.component';

describe('ListsectorComponent', () => {
  let component: ListsectorComponent;
  let fixture: ComponentFixture<ListsectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListsectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
