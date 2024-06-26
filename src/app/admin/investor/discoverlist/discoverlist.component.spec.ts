import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiscoverlistComponent } from './discoverlist.component';

describe('DiscoverlistComponent', () => {
  let component: DiscoverlistComponent;
  let fixture: ComponentFixture<DiscoverlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiscoverlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiscoverlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
