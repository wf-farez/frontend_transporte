
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ParadaService } from '../../service/parada.service';

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
  modalType = "Add";
  
  paradaForm = this.fb.group({
    idParada: [""],
    nombreParada: ["", Validators.required],
    direccion: ["",Validators.required],
    latitud: [0, Validators.required],
    longitud: [0, Validators.required]
    
  });



  constructor(private fb: FormBuilder, private paradaService: ParadaService,
    private messageService: MessageService) { }

  ngOnInit(): void {
  
  }

  ngOnChanges(): void {
    if (this.selectedParada) {
      this.modalType = 'Edit';
      this.paradaForm.patchValue({
        idParada: this.selectedParada.idParada,
        nombreParada: this.selectedParada.nombreParada,
        direccion: this.selectedParada.direccion,
        latitud: this.selectedParada.latitud,
        longitud: this.selectedParada.longitud
        
      });
    } else {
      this.paradaForm.reset();
      this.modalType = 'Add';
    }
  }



  closeModal() {
    this.paradaForm.reset();
    this.clickClose.emit(true);
  }

  addEditParada() {
    if (this.modalType === 'Add') {
      // Si es una nueva parada, eliminamos el campo idParada del formulario
      const { idParada, ...newparada } = this.paradaForm.value;
      this.paradaService.addEditParada(newparada, this.selectedParada).subscribe(
        response => {
          this.clickAddEdit.emit(response);
          this.closeModal();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'parada added' });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
          console.log('Error occurred');
        }
      );
    } else if (this.modalType === 'Edit') {
      // Si es una parada existente, enviamos el formulario completo
      this.paradaService.addEditParada(this.paradaForm.value, this.selectedParada).subscribe(
        response => {
          this.clickAddEdit.emit(response);
          this.closeModal();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'parada updated' });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
          console.log('Error occurred');
        }
      );
    }
  }
}
