import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaCreateEditComponent } from './area-create-edit.component';

describe('AreaCreateEditComponent', () => {
  let component: AreaCreateEditComponent;
  let fixture: ComponentFixture<AreaCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AreaCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AreaCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
