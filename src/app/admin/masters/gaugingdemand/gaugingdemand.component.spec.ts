import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaugingdemandComponent } from './gaugingdemand.component';

describe('GaugingdemandComponent', () => {
  let component: GaugingdemandComponent;
  let fixture: ComponentFixture<GaugingdemandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaugingdemandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GaugingdemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
