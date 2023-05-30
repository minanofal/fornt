import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypyCreateEditComponent } from './typy-create-edit.component';

describe('TypyCreateEditComponent', () => {
  let component: TypyCreateEditComponent;
  let fixture: ComponentFixture<TypyCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypyCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypyCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
