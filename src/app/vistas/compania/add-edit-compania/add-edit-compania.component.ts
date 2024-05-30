
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CompaniaService } from '../../../service/compania.service';

@Component({
  selector: 'app-add-edit-compania',
  templateUrl: './add-edit-compania.component.html',
  styleUrls: ['./add-edit-compania.component.css']
})
export class AddEditCompaniaComponent implements OnInit {

  @Input() displayAddEditModal: boolean = true;
  @Input() selectedCompania: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  modalType = "Registrar";
  
  companiaForm = this.fb.group({
    idCompania: [""],
    nombreCompania: ["", Validators.required],
    direccion: ["", Validators.required],
  });

  constructor(private fb: FormBuilder, private companiaService: CompaniaService,
    private messageService: MessageService) { }

  ngOnInit(): void {
   
  }

  ngOnChanges(): void {
    if (this.selectedCompania) {
      this.modalType = 'Editar';
      this.companiaForm.patchValue({
        idCompania: this.selectedCompania.idCompania,
        nombreCompania: this.selectedCompania.nombreCompania,
        direccion: this.selectedCompania.direccion,
      });
    } else {
      this.companiaForm.reset();
      this.modalType = 'Registrar';
    }
  }

  

  closeModal() {
    this.companiaForm.reset();
    this.clickClose.emit(true);
  }

  registrarCompania() {
    if (this.modalType === 'Registrar') {
      // Si es una nueva compania, eliminamos el campo idcompania del formulario
      const { idCompania, ...newCompania } = this.companiaForm.value;
      this.companiaService.registrarCompania(newCompania, this.selectedCompania).subscribe(
        response => {
          this.clickAddEdit.emit(response);
          this.closeModal();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Compania Registrada' });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
          console.log('Error occurred');
        }
      );
    } else if (this.modalType === 'Editar') {
      // Si es una compania existente, enviamos el formulario completo
      this.companiaService.registrarCompania(this.companiaForm.value, this.selectedCompania).subscribe(
        response => {
          this.clickAddEdit.emit(response);
          this.closeModal();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Compania actualizada' });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
          console.log('Error occurred');
        }
      );
    }
  }
}
