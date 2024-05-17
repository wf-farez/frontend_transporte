
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ViajeService } from '../../service/viaje.service';
import { Subscription } from 'rxjs';
import { EmpleadoService } from '../../service/empleado.service';
import { Empleado } from '../../interface/empleado';
import { Unidad } from '../../interface/unidad';
import { UnidadService } from '../../service/unidad.service';
import { Ruta } from '../../interface/ruta';
import { RutaService } from '../../service/ruta.service';

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
    private rutaService: RutaService,
    private fb: FormBuilder, 
    private viajeService: ViajeService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
    ) { }


    conductorV:Empleado | any;
    ayudanteV:Empleado | any;
    unidadV:Unidad | any;
    rutaV:Ruta| any;
  
    viajeForm = this.fb.group({
      idViaje: [""],
      codigoViaje: ["", Validators.required],
      fecha: [new Date(), Validators.required], // Cambiar el tipo de "fecha" de null a Date
      horaInicio: [new Date(), Validators.required], // Mantener el tipo de "horaInicio" como Date
      horaFin: [new Date(), Validators.required], // Mantener el tipo de "horaFin" como Date
      precioNormal: [0, Validators.required],
      precioDiferenciado: [0, Validators.required],
      conductor: [null],
      ayudante: [null],
      unidad: [null],
      ruta: [null],
      estado:false
    });
  



 

  horaInicio: Date | null = null;
  horaFin: Date | null = null;
  fecha: Date | null = null;
  
  //empleados
  empleados: Empleado[] = [];
  filteredEmpleados: Empleado[] = [];
  searchTerm: string = '';

  selectedEmpleadoC: any = null;
  selectedEmpleadoA: any = null;
  selectedUnidad: any = null;
  selectedRuta: any = null;

  selectedEstado: string = '';
  subscriptions: Subscription[] = [];
  selectedFilter: string = '';
  filterValue: string = '';

  //unidades
  unidades: Unidad[] = [];
  filteredUnidades: Unidad[] = [];
  searchTermU: string = '';
  selectedFilterU: string = '';
  filterValueU: string = '';
  

    //rutas
    rutas: Ruta[] = [];
    filteredRutas: Ruta[] = [];
    searchTermR: string = '';
  
  ngOnInit(): void {
      this.getEmpleadosList();
      this.getUnidadesList();
      this.getRutasList();
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
 
    getRutasList() {
      this.rutaService.getRutas().subscribe(
        response => {
          this.rutas = response;
          this.filteredRutas = [...this.rutas]; // Copia las empleados al array filtrado inicialmente
        }
      )
    }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }


ngOnChanges(): void {

    if (this.selectedViaje) {
      this.modalType = 'Edit';
 
      console.log(this.selectedViaje.fecha,
        this.selectedViaje.horaInicio,
        this.selectedViaje.horaFin,)

        this.viajeForm.patchValue({
            idViaje: this.selectedViaje.idViaje,
            codigoViaje: this.selectedViaje.codigoViaje,
            fecha: new Date(this.selectedViaje.fecha),
            horaInicio: new Date(this.selectedViaje.horaInicio),
            horaFin: new Date(this.selectedViaje.horaFin),
            precioNormal: this.selectedViaje.precioNormal,
            precioDiferenciado: this.selectedViaje.precioDiferenciado,
            conductor: this.selectedViaje.conductor,
            ayudante: this.selectedViaje.ayudante,
            unidad: this.selectedViaje.unidad,
            ruta: this.selectedViaje.ruta,
            estado:this.selectedViaje.estado
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

     // Asigna los valores seleccionados al formulario

      const { idViaje, ...newViaje } = this.viajeForm.value;
  
      // const fechaFormateada = this.formatDate(newViaje.fecha);
      // const horaInicioFormateada = this.formatTime(newViaje.horaInicio);
      // const horaFinFormateada = this.formatTime(newViaje.horaFin);
  
      // this.viajeService.addEditViaje({ ...newViaje, fecha: fechaFormateada, horaInicio: horaInicioFormateada, horaFin: horaFinFormateada }, this.selectedViaje).subscribe(
        
      this.viajeService.addEditViaje(newViaje , this.selectedViaje).subscribe(
          
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
  
      // const fechaFormateada = this.formatDate(editedViaje.fecha);
      // const horaInicioFormateada = this.formatTime(editedViaje.horaInicio);
      // const horaFinFormateada = this.formatTime(editedViaje.horaFin);
  
      // this.viajeService.addEditViaje({ ...editedViaje, fecha: fechaFormateada, horaInicio: horaInicioFormateada, horaFin: horaFinFormateada }, this.selectedViaje).subscribe(
        this.viajeService.addEditViaje(editedViaje , this.selectedViaje).subscribe(

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
  

// private formatDate(dateString: string | null | undefined): string {
//     // Verifica si la cadena de fecha existe
//     if (dateString) {
//       // Convierte la cadena de fecha a un objeto Date
//       const dateObject = new Date(dateString);
  
//       // Verifica si la conversión fue exitosa
//       if (!isNaN(dateObject.getTime())) {
//         // Obtén solo la parte de la fecha (sin la hora ni los caracteres adicionales)
//         return dateObject.toISOString().split('T')[0];
//       } else {
//         // Si la conversión falla, devuelve una cadena vacía o un valor predeterminado según lo necesites
//         return '';
//       }
//     } else {
//       // Si la cadena de fecha es null o undefined, devuelve una cadena vacía o un valor predeterminado según lo necesites
//       return '';
//     }
//   }
  

// private formatTime(dateString: string | null | undefined): string {
//     // Verifica si la cadena de fecha existe
//     if (dateString) {
//       // Convierte la cadena de fecha a un objeto Date
//       const dateObject = new Date(dateString);
  
//       // Verifica si la conversión fue exitosa
//       if (!isNaN(dateObject.getTime())) {
//         // Obtiene las horas, minutos y segundos del objeto Date
//         const hours = dateObject.getHours().toString().padStart(2, '0');
//         const minutes = dateObject.getMinutes().toString().padStart(2, '0');
//         const seconds = dateObject.getSeconds().toString().padStart(2, '0');
  
//         // Formatea la hora en formato HH:MM:SS
//         return `${hours}:${minutes}:${seconds}`;
//       } else {
//         // Si la conversión falla, devuelve una cadena vacía o un valor predeterminado según lo necesites
//         return '';
//       }
//     } else {
//       // Si la cadena de fecha es null o undefined, devuelve una cadena vacía o un valor predeterminado según lo necesites
//       return '';
//     }
//   }
  


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


filterByR(event: any) {
          const value = event?.target?.value;
          if (value) {
            if (this.selectedFilter === 'nombreCompania') {
              this.rutas = this.rutas.filter(ruta => ruta.nombreCompania.toLowerCase().includes(value.toLowerCase()));
            } else if (this.selectedFilter === 'nombreRuta') {
              this.rutas = this.rutas.filter(ruta => ruta.nombreRuta.toLowerCase().includes(value.toLowerCase()));
            } else if (this.selectedFilter === 'origenRuta') {
              this.rutas = this.rutas.filter(ruta => ruta.origenRuta.toLowerCase().includes(value.toLowerCase()));
            } else if (this.selectedFilter === 'destinoRuta') {
              this.rutas = this.rutas.filter(ruta => ruta.destinoRuta.toLowerCase().includes(value.toLowerCase()));
            }
          }else {
                // Si no se ha ingresado nada en el input, muestra todas las rutas nuevamente
                this.getRutasList();
              }
          
          
          }
          


seleccionarConductor(empleado: any){

  try {
    this.selectedEmpleadoC = empleado;

    if (!this.selectedEmpleadoC) {
      throw new Error('No se ha seleccionado ninguna fila.');
    }

    console.log('Objeto empleado', this.selectedEmpleadoC);

    // Agrega condcutor  seleccionada a la objeto conductor      
    
    this.conductorV = {
      idEmpleado: empleado.idEmpleado, 
      cedula: empleado?.cedula, 
      nombre: empleado.nombre, 
      apellido: empleado.apellido,
      direccion: empleado.direccion,
      tipo: 'Conductor',
      codigoAcceso: empleado.codigoAcceso,
    };

     // Asignar los valores guardados en conductorV, ayudanteV y unidadV al formulario
     this.viajeForm.patchValue({
      conductor:this.conductorV
    });

    // Opcionalmente, puedes enviar un mensaje de éxito
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Conductor asignada correctamente.' });

  } catch (error) {
    console.error('Error:', error);
  }
        }



seleccionarAyudante(empleado: any){
  try {
    this.selectedEmpleadoA = empleado;

    if (!this.selectedEmpleadoA) {
      throw new Error('No se ha seleccionado ninguna fila.');
    }

    console.log('Objeto empleado', this.selectedEmpleadoA);

    // Agrega condcutor  seleccionada a la objeto conductor      
    
    this.ayudanteV= {
      idEmpleado: this.selectedEmpleadoA.idEmpleado, 
      cedula: this.selectedEmpleadoA?.cedula, 
      nombre: this.selectedEmpleadoA.nombre, 
      apellido: this.selectedEmpleadoA.apellido,
      direccion: this.selectedEmpleadoA.direccion,
      tipo: 'Ayudante',
      codigoAcceso: this.selectedEmpleadoA.codigoAcceso,
  
    }

    // Asignar los valores guardados en conductorV, ayudanteV y unidadV al formulario
    this.viajeForm.patchValue({
      ayudante:this.ayudanteV
    });
    // Opcionalmente, puedes enviar un mensaje de éxito
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Ayudante asignada correctamente.' });

  } catch (error) {
    console.error('Error:', error);
  }

        }


seleccionarUnidad(unidad: any){
  try {
    this.selectedUnidad = unidad;

    if (!this.selectedUnidad) {
      throw new Error('No se ha seleccionado ninguna fila.');
    }

    console.log('Objeto unidad', this.selectedUnidad);

    // Agrega condcutor  seleccionada a la objeto conductor      
    
    this.unidadV = {
      idUnidad: this.selectedUnidad.idUnidad, 
      codigoUnidad: this.selectedUnidad.codigoUnidad, 
      placa: this.selectedUnidad.placa, 
      cantidadAsientos: this.selectedUnidad.cantidadAsientos,
      estado: this.selectedUnidad.estado,
    };

    this.viajeForm.patchValue({
      unidad:this.unidadV
    });

    // Opcionalmente, puedes enviar un mensaje de éxito
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Unidad asignada correctamente.' });

  } catch (error) {
    console.error('Error:', error);
  }
  
        }




        
seleccionarRuta(ruta: any){
  try {
    this.selectedRuta= ruta;

    if (!this.selectedRuta) {
      throw new Error('No se ha seleccionado ninguna fila.');
    }

    console.log('Objeto unidad', this.selectedRuta);

    // Agrega condcutor  seleccionada a la objeto conductor      
    
    this.rutaV = {
      idRuta: this.selectedRuta.idRuta, 
      nombreCompania: this.selectedRuta.nombreCompania, 
      nombreRuta: this.selectedRuta.nombreRuta, 
      origenRuta: this.selectedRuta.origenRuta,
      destinoRuta: this.selectedRuta.destinoRuta,
    };
    this.viajeForm.patchValue({
      ruta:this.rutaV
    });

    // Opcionalmente, puedes enviar un mensaje de éxito
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Ruta asignada correctamente.' });

  } catch (error) {
    console.error('Error:', error);
  }
  
        }


}
