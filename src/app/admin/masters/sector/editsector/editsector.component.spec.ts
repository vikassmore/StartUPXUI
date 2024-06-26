import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditsectorComponent } from './editsector.component';

describe('EditsectorComponent', () => {
  let component: EditsectorComponent;
  let fixture: ComponentFixture<EditsectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditsectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditsectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
