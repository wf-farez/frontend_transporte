
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { UnidadService } from '../../../service/unidad.service';
import { Unidad } from '../../../interface/unidad';

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
  modalType = "Crear";
  
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
      this.modalType = 'Editar';
      this.unidadForm.patchValue({
        idUnidad: this.selectedUnidad.idUnidad,
        codigoUnidad: this.selectedUnidad.codigoUnidad,
        placa: this.selectedUnidad.placa,
        cantidadAsientos: this.selectedUnidad.cantidadAsientos,
        estado: this.selectedUnidad.estado
      });
    } else {
      this.unidadForm.reset();
      this.modalType = 'Crear';
    }
  }

  closeModal() {
    this.unidadForm.reset();
    this.clickClose.emit(true);
  }

  registrarUnidad() {
    if (this.modalType === 'Crear') {

      this.unidadForm.patchValue({
        estado: false
      });

      const { idUnidad, ...newUnidad } = this.unidadForm.value;

      this.unidadService.registrarUnidad(newUnidad, this.selectedUnidad).subscribe(
        
        (response : any) => {
          // Una vez registrada la unidad, creamos automáticamente los asientos asociados
          const unidadId = response.idUnidad; // Obtenemos el ID de la unidad registrada
          const cantidad=response.cantidadAsientos;

          console.log("aaaa  "+cantidad)
          this.clickregistrar.emit(response);
          this.closeModal();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Unidad registrada' });
          this.crearAsientos(response.data); // Creamos los asientos
        
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
          console.log('Error occurred');
        }
      );
    } else if (this.modalType === 'Editar') {

      this.unidadService.registrarUnidad(this.unidadForm.value, this.selectedUnidad).subscribe(
        (response: any) => {
          this.clickregistrar.emit(response);
          this.closeModal();
          this.crearAsientos(response.data); // Creamos los asientos
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Unidad actualizada' });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Datos invalidos' });
          console.log('Error occurred');
        }
      );
      }
    }
      
  
  crearAsientos( unidad: Unidad) {

    //con el id: Eliminamos los asientos 
    const idUnidadEnviar=unidad.idUnidad;
    this.limpiarRegistrosDeAsientos(idUnidadEnviar);

    const cantidadAsientos=unidad.cantidadAsientos;

    for (let i = 1; i <= cantidadAsientos; i++) {

      const nuevoAsiento = {
        numeroAsiento: i,
        unidad: unidad, 
        estado: false 
      };

      //console.log(nuevoAsiento)

      this.unidadService.registrarAsientos(nuevoAsiento).subscribe(
        (response : any) => {
          console.log('Asiento creado:', response);
        },
        error => {
          console.error('Error al crear el asiento:', error);
        }
      );
    }



  }
  


  limpiarRegistrosDeAsientos(idUnidadEnviar: number) {

    console.log(idUnidadEnviar)

    return new Promise<void>((resolve, reject) => {
      // Llamar al servicio para eliminar registros de paradas de ruta por ID de ruta
      this.unidadService.eliminarAsientoUnidadByUnidadId(idUnidadEnviar).subscribe(
        () => {
          // Éxito al eliminar registros
          console.log('Registros de asientos de unidad eliminados correctamente.');
          resolve();
        },
        error => {
          // Error al eliminar registros
          console.error('Error al eliminar registros de asientos de unidad:', error);
          reject(error);
        }
      );
    });
  }

  

}
