import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenementAddComponent } from './evenement-add.component';

describe('EvenementAddComponent', () => {
  let component: EvenementAddComponent;
  let fixture: ComponentFixture<EvenementAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvenementAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvenementAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
