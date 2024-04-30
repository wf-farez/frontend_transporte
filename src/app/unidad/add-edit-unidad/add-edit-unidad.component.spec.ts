import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditUnidadComponent } from './add-edit-unidad.component';

describe('AddEditUnidadComponent', () => {
  let component: AddEditUnidadComponent;
  let fixture: ComponentFixture<AddEditUnidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditUnidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
