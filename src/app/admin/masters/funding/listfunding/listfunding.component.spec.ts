import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListfundingComponent } from './listfunding.component';

describe('ListfundingComponent', () => {
  let component: ListfundingComponent;
  let fixture: ComponentFixture<ListfundingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListfundingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListfundingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
