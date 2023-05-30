import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityEditCreateComponent } from './city-edit-create.component';

describe('CityEditCreateComponent', () => {
  let component: CityEditCreateComponent;
  let fixture: ComponentFixture<CityEditCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CityEditCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityEditCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
