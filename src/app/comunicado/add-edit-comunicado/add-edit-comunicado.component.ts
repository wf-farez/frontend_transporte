
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ComunicadoService } from '../../service/comunicado.service';

@Component({
  selector: 'app-add-edit-comunicado',
  templateUrl: './add-edit-comunicado.component.html',
  styleUrls: ['./add-edit-comunicado.component.css']
})
export class AddEditComunicadoComponent implements OnInit {

  @Input() displayAddEditModal: boolean = true;
  @Input() selectedComunicado: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  modalType = "Add";
  
  comunicadoForm = this.fb.group({
    idComunicado: [""],
    descripcion: ["", Validators.required],
    fecha: [""],
  });

  constructor(private fb: FormBuilder, private ComunicadoService: ComunicadoService,
    private messageService: MessageService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.selectedComunicado) {
      this.modalType = 'Edit';
      this.comunicadoForm.patchValue({
        idComunicado: this.selectedComunicado.idComunicado,
        descripcion: this.selectedComunicado.codigoComunicado,
        fecha: this.selectedComunicado.placa,
      });
    } else {
      this.comunicadoForm.reset();
      this.modalType = 'Add';
    }
  }

  closeModal() {
    this.comunicadoForm.reset();
    this.clickClose.emit(true);
  }

  addEditComunicado() {
    if (this.modalType === 'Add') {
      // Si es una nueva Comunicado, eliminamos el campo idComunicado del formulario
      const { idComunicado, ...newComunicado } = this.comunicadoForm.value;
      // Obtener la fecha actual y formatearla como una cadena
      newComunicado.fecha = new Date().toISOString();
      this.ComunicadoService.addEditComunicado(newComunicado, this.selectedComunicado).subscribe(
        response => {
          this.clickAddEdit.emit(response);
          this.closeModal();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Comunicado added' });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
          console.log('Error occurred');
        }
      );
    } else if (this.modalType === 'Edit') {
      // Si es una Comunicado existente, enviamos el formulario completo
      this.ComunicadoService.addEditComunicado(this.comunicadoForm.value, this.selectedComunicado).subscribe(
        response => {
          this.clickAddEdit.emit(response);
          this.closeModal();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Comunicado updated' });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
          console.log('Error occurred');
        }
      );
    }
  }
}