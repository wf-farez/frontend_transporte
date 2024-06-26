
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ParadaService } from '../../../service/parada.service';

@Component({
  selector: 'app-add-edit-parada',
  templateUrl: './add-edit-parada.component.html',
  styleUrls: ['./add-edit-parada.component.css']
})
export class AddEditParadaComponent implements OnInit {

  @Input() displayAddEditModal: boolean = true;
  @Input() selectedParada: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  modalType = "Crear";
  
  paradaForm = this.fb.group({
    idParada: [""],
    nombreParada: ["", Validators.required],
    direccion: ["",Validators.required],
    latitud: ["", Validators.required],
    longitud: ["", Validators.required]
    
  });



  constructor(private fb: FormBuilder, private paradaService: ParadaService,
    private messageService: MessageService) { }

  ngOnInit(): void {

  
  }

  ngOnChanges(): void {
    if (this.selectedParada) {
      this.modalType = 'Editar';
      this.paradaForm.patchValue({
        idParada: this.selectedParada.idParada,
        nombreParada: this.selectedParada.nombreParada,
        direccion: this.selectedParada.direccion,
        latitud: this.selectedParada.latitud,
        longitud: this.selectedParada.longitud
        
      });
    } else {
      this.paradaForm.reset();
      this.modalType = 'Crear';
    }
  }



  closeModal() {
    this.paradaForm.reset();
    this.clickClose.emit(true);
  }

  registrarParada() {
    if (this.modalType === 'Crear') {
      // Si es una nueva parada, eliminamos el campo idParada del formulario
      const { idParada, ...newparada } = this.paradaForm.value;
      this.paradaService.registrarParada(newparada, this.selectedParada).subscribe(
        response => {
          this.clickAddEdit.emit(response);
          this.closeModal();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Parada Registrada' });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
          console.log('Error occurred');
        }
      );
    } else if (this.modalType === 'Editar') {
      // Si es una parada existente, enviamos el formulario completo
      this.paradaService.registrarParada(this.paradaForm.value, this.selectedParada).subscribe(
        response => {
          this.clickAddEdit.emit(response);
          this.closeModal();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Parada actualizada' });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
          console.log('Error occurred');
        }
      );
    }
  }
}
