import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategpryComponent } from './categpry.component';

describe('CategpryComponent', () => {
  let component: CategpryComponent;
  let fixture: ComponentFixture<CategpryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategpryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategpryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
