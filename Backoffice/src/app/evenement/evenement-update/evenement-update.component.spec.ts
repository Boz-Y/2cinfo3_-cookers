import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenementUpdateComponent } from './evenement-update.component';

describe('EvenementUpdateComponent', () => {
  let component: EvenementUpdateComponent;
  let fixture: ComponentFixture<EvenementUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvenementUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvenementUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
