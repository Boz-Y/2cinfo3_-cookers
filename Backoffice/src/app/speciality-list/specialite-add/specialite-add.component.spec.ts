import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialiteAddComponent } from './specialite-add.component';

describe('SpecialiteAddComponent', () => {
  let component: SpecialiteAddComponent;
  let fixture: ComponentFixture<SpecialiteAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialiteAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialiteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
