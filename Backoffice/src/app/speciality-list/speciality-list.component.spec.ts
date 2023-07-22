import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialityListComponent } from './speciality-list.component';

describe('SpecialityListComponent', () => {
  let component: SpecialityListComponent;
  let fixture: ComponentFixture<SpecialityListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialityListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
