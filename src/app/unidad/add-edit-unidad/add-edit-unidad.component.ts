
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UnidadService } from '../../service/unidad.service';

@Component({
  selector: 'app-add-edit-unidad',
  templateUrl: './add-edit-unidad.component.html',
  styleUrls: ['./add-edit-unidad.component.css']
})
export class AddEditUnidadComponent implements OnInit {

  @Input() displayAddEditModal: boolean = true;
  @Input() selectedUnidad: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickregistrar: EventEmitter<any> = new EventEmitter<any>();
  modalType = "Add";
  
  unidadForm = this.fb.group({
    idUnidad: [""],
    codigoUnidad: ["", Validators.required],
    placa: ["",Validators.required],
    cantidadAsientos: [0, Validators.required],
    estado: [false]
  });


  
  constructor(private fb: FormBuilder, private unidadService: UnidadService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.unidadForm.patchValue({ estado: false });
  }

  ngOnChanges(): void {
    if (this.selectedUnidad) {
      this.modalType = 'Edit';
      this.unidadForm.patchValue({
        idUnidad: this.selectedUnidad.idUnidad,
        codigoUnidad: this.selectedUnidad.codigoUnidad,
        placa: this.selectedUnidad.placa,
        cantidadAsientos: this.selectedUnidad.cantidadAsientos,
        estado: this.selectedUnidad.estado
      });
    } else {
      this.unidadForm.reset();
      this.modalType = 'Add';
    }
  }

  closeModal() {
    this.unidadForm.reset();
    this.clickClose.emit(true);
  }

  registrarUnidad() {
    if (this.modalType === 'Add') {
      // Si es una nueva unidad, eliminamos el campo id_unidad del formulario
      const { idUnidad, ...newUnidad } = this.unidadForm.value;
      this.unidadService.registrarUnidad(newUnidad, this.selectedUnidad).subscribe(
        response => {
          this.clickregistrar.emit(response);
          this.closeModal();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Unidad added' });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
          console.log('Error occurred');
        }
      );
    } else if (this.modalType === 'Edit') {
      // Si es una unidad existente, enviamos el formulario completo
      this.unidadService.registrarUnidad(this.unidadForm.value, this.selectedUnidad).subscribe(
        response => {
          this.clickregistrar.emit(response);
          this.closeModal();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Unidad updated' });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
          console.log('Error occurred');
        }
      );
    }

  }

  
}
