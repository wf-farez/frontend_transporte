
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { RutaService } from '../../service/ruta.service';

@Component({
  selector: 'app-add-edit-ruta',
  templateUrl: './add-edit-ruta.component.html',
  styleUrls: ['./add-edit-ruta.component.css']
})
export class AddEditRutaComponent implements OnInit {

  @Input() displayAddEditModal: boolean = true;
  @Input() selectedRuta: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  modalType = "Add";
  
  rutaForm = this.fb.group({
    idRuta: [""],
    nombreCompania: ["", Validators.required],
    nombreRuta: ["", Validators.required],
    origenRuta: ["", Validators.required],
    destinoRuta: ["", Validators.required],
  });



  constructor(private fb: FormBuilder, private RutaService: RutaService,
    private messageService: MessageService) { }

  ngOnInit(): void {
   
  }

  ngOnChanges(): void {
    if (this.selectedRuta) {
      this.modalType = 'Edit';
      this.rutaForm.patchValue({
        idRuta: this.selectedRuta.idRuta,
        nombreCompania: this.selectedRuta.nombreCompania,
        nombreRuta: this.selectedRuta.nombreRuta,
        origenRuta: this.selectedRuta.origenRuta,
        destinoRuta: this.selectedRuta.destinoRuta
      });
    } else {
      this.rutaForm.reset();
      this.modalType = 'Add';
    }
  }

  closeModal() {
    this.rutaForm.reset();
    this.clickClose.emit(true);
  }

  registrarRuta() {
    if (this.modalType === 'Add') {
      // Si es una nueva Ruta, eliminamos el campo idRuta del formulario
      const { idRuta, ...newRuta } = this.rutaForm.value;
      this.RutaService.registrarRuta(newRuta, this.selectedRuta).subscribe(
        response => {
          this.clickAddEdit.emit(response);
          this.closeModal();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Ruta added' });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
          console.log('Error occurred');
        }
      );
    } else if (this.modalType === 'Edit') {
      // Si es una Ruta existente, enviamos el formulario completo
      this.RutaService.registrarRuta(this.rutaForm.value, this.selectedRuta).subscribe(
        response => {
          this.clickAddEdit.emit(response);
          this.closeModal();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Ruta updated' });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
          console.log('Error occurred');
        }
      );
    }
  }
}
