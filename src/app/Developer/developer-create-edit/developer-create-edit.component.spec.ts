import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperCreateEditComponent } from './developer-create-edit.component';

describe('DeveloperCreateEditComponent', () => {
  let component: DeveloperCreateEditComponent;
  let fixture: ComponentFixture<DeveloperCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeveloperCreateEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeveloperCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
