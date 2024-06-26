import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditfundingComponent } from './editfunding.component';

describe('EditfundingComponent', () => {
  let component: EditfundingComponent;
  let fixture: ComponentFixture<EditfundingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditfundingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditfundingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
