
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { EmpleadoService } from '../../../service/empleado.service';

@Component({
  selector: 'app-add-edit-empleado',
  templateUrl: './add-edit-empleado.component.html',
  styleUrls: ['./add-edit-empleado.component.css']
})
export class AddEditEmpleadoComponent implements OnInit {

  @Input() displayAddEditModal: boolean = true;
  @Input() selectedEmpleado: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  modalType = "Registrar";
  
  empleadoForm = this.fb.group({
    idEmpleado: [""],
    cedula: ["", Validators.required],
    nombre: ["", Validators.required],
    apellido: ["", Validators.required],
    direccion: ["", Validators.required],
    tipo: ["", Validators.required],
    codigoAcceso: ["", Validators.required],
 
  });


  opcionesTipo = [
    { label: 'Conductor', value: "Conductor" },
    { label: 'Ayudante', value: "Ayudante" }
  ];
  
  constructor(private fb: FormBuilder, private empleadoService: EmpleadoService,
    private messageService: MessageService) { }

  ngOnInit(): void {
   
  }

  ngOnChanges(): void {
    if (this.selectedEmpleado) {
      this.modalType = 'Editar';
      this.empleadoForm.patchValue({
        idEmpleado: this.selectedEmpleado.idEmpleado,
        cedula: this.selectedEmpleado.cedula,
        nombre: this.selectedEmpleado.nombre,
        apellido: this.selectedEmpleado.apellido,
        direccion: this.selectedEmpleado.direccion,
        tipo: this.selectedEmpleado.tipo,
        codigoAcceso: this.selectedEmpleado.codigoAcceso,
      });
    } else {
      this.empleadoForm.reset();
      this.modalType = 'Registrar';
    }
  }

  

  closeModal() {
    this.empleadoForm.reset();
    this.clickClose.emit(true);
  }

  registrarEmpleado() {
    if (this.modalType === 'Registrar') {
      // Si es una nueva empleado, eliminamos el campo idEmpleado del formulario
      const { idEmpleado, ...newempleado } = this.empleadoForm.value;
      this.empleadoService.registrarEmpleado(newempleado, this.selectedEmpleado).subscribe(
        response => {
          this.clickAddEdit.emit(response);
          this.closeModal();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Empleado registrado' });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
          console.log('Error occurred');
        }
      );
    } else if (this.modalType === 'Editar') {
      // Si es una empleado existente, enviamos el formulario completo
      this.empleadoService.registrarEmpleado(this.empleadoForm.value, this.selectedEmpleado).subscribe(
        response => {
          this.clickAddEdit.emit(response);
          this.closeModal();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Empleado actualizado' });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
          console.log('Error occurred');
        }
      );
    }
  }
}
