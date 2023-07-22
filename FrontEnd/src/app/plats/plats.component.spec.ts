import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatsComponent } from './plats.component';

describe('PlatsComponent', () => {
  let component: PlatsComponent;
  let fixture: ComponentFixture<PlatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
