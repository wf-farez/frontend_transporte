
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ViajeService } from '../../service/viaje.service';

@Component({
  selector: 'app-add-edit-viaje',
  templateUrl: './add-edit-viaje.component.html',
  styleUrls: ['./add-edit-viaje.component.css']
})
export class AddEditViajeComponent implements OnInit {

  @Input() displayAddEditModal: boolean = true;
  @Input() selectedViaje: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  modalType = "Add";
  
  viajeForm = this.fb.group({
    idViaje: [""],
    codigoViaje: ["", Validators.required],
    fecha: ["", Validators.required],
    horaInicio: ["", Validators.required],
    horaFin: ["", Validators.required],
    precioNormal: [0, Validators.required],
    precioDiferenciado: [0, Validators.required],
    idConductor: ["", Validators.required],
    idAyudante: ["", Validators.required]
  });
  
  opcionesEstado = [
    { label: 'Inactivo', value: true },
    { label: 'Activo', value: false }
  ];
  
  constructor(private fb: FormBuilder, private viajeService: ViajeService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    //this.viajeForm.patchValue({ estado: false });
  }
  ngOnChanges(): void {
    if (this.selectedViaje) {
      this.modalType = 'Edit';
      this.viajeForm.patchValue({

        idViaje: this.selectedViaje.idViaje,
        codigoViaje: this.selectedViaje.codigoViaje,
        fecha: this.selectedViaje.fecha,
        horaInicio: this.selectedViaje.horaInicio,
        horaFin: this.selectedViaje.horaFin,
        precioNormal: this.selectedViaje.precioNormal,
        precioDiferenciado: this.selectedViaje.precioDiferenciado,
        idConductor: this.selectedViaje.idConductor,
        idAyudante: this.selectedViaje.idAyudante
      });
    } else {
      this.viajeForm.reset();
      this.modalType = 'Add';
    }
  }
  

  closeModal() {
    this.viajeForm.reset();
    this.clickClose.emit(true);
  }

  addEditViaje() {
    if (this.modalType === 'Add') {
      // Si es una nueva Viaje, eliminamos el campo id_Viaje del formulario
      const { idViaje, ...newViaje } = this.viajeForm.value;
      this.viajeService.addEditViaje(newViaje, this.selectedViaje).subscribe(
        response => {
          this.clickAddEdit.emit(response);
          this.closeModal();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Viaje added' });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
          console.log('Error occurred');
        }
      );
    } else if (this.modalType === 'Edit') {
      // Si es una Viaje existente, enviamos el formulario completo
      this.viajeService.addEditViaje(this.viajeForm.value, this.selectedViaje).subscribe(
        response => {
          this.clickAddEdit.emit(response);
          this.closeModal();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Viaje updated' });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
          console.log('Error occurred');
        }
      );
    }
  }
}
