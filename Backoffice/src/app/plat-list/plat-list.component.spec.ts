import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatListComponent } from './plat-list.component';

describe('PlatListComponent', () => {
  let component: PlatListComponent;
  let fixture: ComponentFixture<PlatListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlatListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
