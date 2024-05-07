
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ViajeService } from '../../service/viaje.service';
import { Subscription } from 'rxjs';
import { EmpleadoService } from '../../service/empleado.service';
import { Empleado } from '../../interface/empleado';
import { Unidad } from '../../interface/unidad';
import { UnidadService } from '../../service/unidad.service';

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

  constructor(
    private unidadService: UnidadService,
    private empleadoService: EmpleadoService,
    private fb: FormBuilder, 
    private viajeService: ViajeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
    ) { }
  
  viajeForm = this.fb.group({
    idViaje: [""],
    codigoViaje: ["", Validators.required],
    fecha: ["", Validators.required],
    horaInicio: ["", Validators.required],
    horaFin: ["", Validators.required],
    precioNormal: [0, Validators.required],
    precioDiferenciado: [0, Validators.required],
    idConductor: ["", Validators.required],
    idAyudante: ["", Validators.required],
    idUnidad: ["", Validators.required]
  });
  
  opcionesEstado = [
    { label: 'Inactivo', value: true },
    { label: 'Activo', value: false }
  ];
  
  time1: Date | null = null;
  time2: Date | null = null;

  
  //empleados
  empleados: Empleado[] = [];
  filteredEmpleados: Empleado[] = [];
  searchTerm: string = '';
  selectedEmpleado: any = null;
  selectedEstado: string = '';
  subscriptions: Subscription[] = [];
  selectedFilter: string = '';
  filterValue: string = '';

  //unidades
  unidades: Unidad[] = [];
  filteredUnidades: Unidad[] = [];
  searchTermU: string = '';
  selectedUnidad: any = null;
  selectedFilterU: string = '';
  filterValueU: string = '';
  
  
  ngOnInit(): void {
      this.getEmpleadosList();
      this.getUnidadesList();
    }
  
    getUnidadesList() {
      this.unidadService.getUnidades().subscribe(
        response => {
          this.unidades = response;
          this.filteredUnidades = [...this.unidades]; // Copia las unidades al array filtrado inicialmente
        }
      )
    }

  getEmpleadosList() {
      this.empleadoService.getEmpleados().subscribe(
        response => {
          this.empleados = response;
          this.filteredEmpleados = [...this.empleados]; // Copia las empleados al array filtrado inicialmente
        }
      )
    }
 

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


ngOnChanges(): void {
    if (this.selectedViaje) {
      this.modalType = 'Edit';
 
      this.viajeForm.patchValue({

        idViaje: this.selectedViaje.idViaje,
        codigoViaje: this.selectedViaje.codigoViaje,
        fecha: this.selectedViaje.fecha,
        // horaInicio: this.selectedViaje.horaInicio,
        // horaFin: this.selectedViaje.horaFin,
        horaInicio: null,
        horaFin: null,
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
      const { idViaje, ...newViaje } = this.viajeForm.value;
  
      const fechaFormateada = this.formatDate(newViaje.fecha);
      const horaInicioFormateada = this.formatTime(newViaje.horaInicio);
      const horaFinFormateada = this.formatTime(newViaje.horaFin);
  
      this.viajeService.addEditViaje({ ...newViaje, fecha: fechaFormateada, horaInicio: horaInicioFormateada, horaFin: horaFinFormateada }, this.selectedViaje).subscribe(
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
      const { idViaje, ...editedViaje } = this.viajeForm.value;
  
      const fechaFormateada = this.formatDate(editedViaje.fecha);
      const horaInicioFormateada = this.formatTime(editedViaje.horaInicio);
      const horaFinFormateada = this.formatTime(editedViaje.horaFin);
  
      this.viajeService.addEditViaje({ ...editedViaje, fecha: fechaFormateada, horaInicio: horaInicioFormateada, horaFin: horaFinFormateada }, this.selectedViaje).subscribe(
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
  

private formatDate(dateString: string | null | undefined): string {
    // Verifica si la cadena de fecha existe
    if (dateString) {
      // Convierte la cadena de fecha a un objeto Date
      const dateObject = new Date(dateString);
  
      // Verifica si la conversión fue exitosa
      if (!isNaN(dateObject.getTime())) {
        // Obtén solo la parte de la fecha (sin la hora ni los caracteres adicionales)
        return dateObject.toISOString().split('T')[0];
      } else {
        // Si la conversión falla, devuelve una cadena vacía o un valor predeterminado según lo necesites
        return '';
      }
    } else {
      // Si la cadena de fecha es null o undefined, devuelve una cadena vacía o un valor predeterminado según lo necesites
      return '';
    }
  }
  

private formatTime(dateString: string | null | undefined): string {
    // Verifica si la cadena de fecha existe
    if (dateString) {
      // Convierte la cadena de fecha a un objeto Date
      const dateObject = new Date(dateString);
  
      // Verifica si la conversión fue exitosa
      if (!isNaN(dateObject.getTime())) {
        // Obtiene las horas, minutos y segundos del objeto Date
        const hours = dateObject.getHours().toString().padStart(2, '0');
        const minutes = dateObject.getMinutes().toString().padStart(2, '0');
        const seconds = dateObject.getSeconds().toString().padStart(2, '0');
  
        // Formatea la hora en formato HH:MM:SS
        return `${hours}:${minutes}:${seconds}`;
      } else {
        // Si la conversión falla, devuelve una cadena vacía o un valor predeterminado según lo necesites
        return '';
      }
    } else {
      // Si la cadena de fecha es null o undefined, devuelve una cadena vacía o un valor predeterminado según lo necesites
      return '';
    }
  }
  


filterBy(event: any) {
    const value = event?.target?.value;
    if (value) {
      if (this.selectedFilter === 'cedula') {
        this.empleados = this.empleados.filter(Empleado => Empleado.cedula.toLowerCase().includes(value.toLowerCase()));
      } else if (this.selectedFilter === 'nombre') {
        this.empleados = this.empleados.filter(Empleado => Empleado.nombre.toLowerCase().includes(value.toLowerCase()));
      } else if (this.selectedFilter === 'apellido') {
        this.empleados = this.empleados.filter(Empleado => Empleado.apellido.toLowerCase().includes(value.toLowerCase()));
      } else if (this.selectedFilter === 'direccion') {
        this.empleados = this.empleados.filter(Empleado => Empleado.direccion.toLowerCase().includes(value.toLowerCase()));
      } else if (this.selectedFilter === 'tipo') {
        this.empleados = this.empleados.filter(Empleado => Empleado.tipo.toLowerCase().includes(value.toLowerCase()));
      } else if (this.selectedFilter === 'codigoAcceso') {
        this.empleados = this.empleados.filter(Empleado => Empleado.codigoAcceso.toLowerCase().includes(value.toLowerCase()));
      }
    }else {
          // Si no se ha ingresado nada en el input, muestra todas las empleados nuevamente
          this.getEmpleadosList();
        }
    
    
    }



filterByU(event: any) {
      const value = event?.target?.value;
      if (value) {
        if (this.selectedFilterU === 'placa') {
          this.unidades = this.unidades.filter(unidad => unidad.placa.toLowerCase().includes(value.toLowerCase()));
        } else if (this.selectedFilterU === 'codigo_unidad') {
          this.unidades = this.unidades.filter(unidad => unidad.codigoUnidad.toLowerCase().includes(value.toLowerCase()));
        } else if (this.selectedFilterU === 'cantidad_asientos') {
          const intValue = parseInt(value, 10); // Convertir el valor a número entero
          this.unidades = this.unidades.filter(unidad => unidad.cantidadAsientos.toString().includes(intValue.toString()));
        } else if (this.selectedFilterU === 'estado') {
          // Si 'estado' es booleano, no es necesario convertirlo a string
          this.unidades = this.unidades.filter(unidad => unidad.estado.toString().toLowerCase().includes(value.toLowerCase()));
        }
      }else {
            // Si no se ha ingresado nada en el input, muestra todas las unidades nuevamente
            this.getUnidadesList();
          }
      
        }



seleccionarConductor(){
        }
seleccionarUnidad(){
        }
}

