import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Viaje } from '../../interface/viaje';
import { ViajeService } from '../../service/viaje.service';
import { UnidadService } from '../../service/unidad.service';
import { EmpleadoService } from '../../service/empleado.service';
import { RutaService } from '../../service/ruta.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Empleado } from '../../interface/empleado';
import { Unidad } from '../../interface/unidad';
import { Ruta } from '../../interface/ruta';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.component.html',
  styleUrls: ['./viaje.component.css']
})
export class ViajeComponent implements OnInit, OnDestroy {

  modalType = "Crear";
  
  viajes: Viaje[] = [];
  filteredViajes: Viaje[] = [];
  searchTerm: string = '';
  conductorSeleccionado: Empleado | undefined;
  displayAddEditModal = false;
  displayEditModalV = false;
  selectedViaje: any = null;
  displayAddModal = false;
  displayAddModalRuta = false;

  displayDetallesModalConductor=false;
  displayDetallesModalAyudante=false;
  displayDetallesModalUnidad=false;

  selectedEstado: string = '';
  subscriptions: Subscription[] = [];
  selectedFilter: string = 'codigoViaje';
  filterValue: string = '';

  conductorV:Empleado | any;
  ayudanteV:Empleado | any;
  unidadV:Unidad | any;
  rutaV:Ruta| any;

  horaInicio: Date | null = null;
  horaFin: Date | null = null;
  fecha: Date | null = null;
  //empleados
  empleados: Empleado[] = [];
  filteredEmpleados: Empleado[] = [];
  selectedEmpleadoC: any = null;
  selectedEmpleadoA: any = null;

  //unidades
  unidades: Unidad[] = [];
  filteredUnidades: Unidad[] = [];
  searchTermU: string = '';
  selectedFilterU: string = '';
  selectedUnidad: any = null;
  selectedRuta: any = null;

  //rutas
  rutas: Ruta[] = [];
  filteredRutas: Ruta[] = [];
  searchTermR: string = '';

  viajeForm = this.fb.group({
    idViaje: [""],
    codigoViaje: [""],
    fecha: [new Date(), Validators.required], // Cambiar el tipo de "fecha" de null a Date
    horaInicio: [new Date(), Validators.required], // Mantener el tipo de "horaInicio" como Date
    horaFin: [new Date(), Validators.required], // Mantener el tipo de "horaFin" como Date
    precioNormal: [0, Validators.required],
    precioDiferenciado: [0, Validators.required],
    ruta: [null],
    estado:false
  });

  viajeForm2 = this.fb.group({
    idViaje: [""],
    codigoViaje: [""],
    // codigoViaje:[this.generarCodigoViaje(), Validators.required],
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

  constructor(
    private viajeService: ViajeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private unidadService: UnidadService,
    private empleadoService: EmpleadoService,
    private rutaService: RutaService,
    private fb: FormBuilder, 
    private router:Router
  ) { }

  ngOnInit(): void {
    this.obtenerViajesList();
    this.applyDefaultFilter();
    this.obtenerEmpleadosList();
    this.obtenerUnidadesList();
    this.obtenerRutasList();
  }

  
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  //.......................................................
  // Aplicar filtro por defecto
  applyDefaultFilter() {
    this.filterBy({ target: { value: '' } });
  }
  // // Obtener lista de viajes
  // obtenerViajesList() {
  //   this.viajeService.obtenerViajes().subscribe(response => {
  //     this.viajes = response;
  //     this.filteredViajes = [...this.viajes]; 
  //   });
  // }

  // Obtener lista de viajes
obtenerViajesList() {
  this.viajeService.obtenerViajes().subscribe(response => {
    this.viajes = response.sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
    this.filteredViajes = [...this.viajes];
  });
}


//---------------------------------------------------------------
  // Mostrar modal para agregar viaje
  showAddModal() {
    this.displayAddModal = true;
    this.selectedViaje = null;
  }
  // Ocultar modal de agregar viaje
  hideAddModal(isClosed: boolean) {
    this.displayAddModal = !isClosed;
    this.obtenerViajesList();
  }
  closeModalAdd() {
    this.viajeForm.reset();
  }
    // Mostrar modal para agregar ruta
  showAddModalRuta() {
    this.displayAddModalRuta = true;
    this.selectedViaje = null;
    }

    hideAddModalRuta(isClosed: boolean) {
      this.displayAddModalRuta = !isClosed;
      }
  
   closeModalAddRuta(){
    this.displayAddModalRuta= false;
  }

   // Mostrar modal para editar viaje
   showEditModalV(viaje: Viaje) {
    this.displayEditModalV = true;
    this.selectedViaje = viaje;
    this.selectedEmpleadoC=viaje.conductor
    this.selectedEmpleadoA=viaje.ayudante
    this.selectedUnidad=viaje.unidad
  }

  hideEditModalV(isClosed: boolean) {
    this.displayEditModalV = !isClosed;
    this.obtenerViajesList();
  }

 
  // Mostrar modal para editar detalles de viaje
  showEditModal(viaje: Viaje) {
    this.displayAddEditModal = true;
    this.selectedViaje = viaje;
    this.selectedEmpleadoC=viaje.conductor
    this.selectedEmpleadoA=viaje.ayudante
    this.selectedUnidad=viaje.unidad
    this.selectedViaje.conductor=this.selectedViaje.conductor;
    this.selectedViaje.ayudante=this.selectedViaje.ayudante;
    this.selectedViaje.unidad=this.selectedViaje.unidad;

  }
  
  closeModalEdit() {
    this.displayEditModalV = false;
  }


  // Mostrar modal para agregar conductor
  showAddModalConductor(viaje: Viaje) {
    this.displayDetallesModalConductor = true;
    this.selectedViaje = viaje;
  }
  hideAddModalConductor(isClosed: boolean) {
    this.displayDetallesModalConductor= !isClosed;
  }
  closeModalConductor() {
    this.displayDetallesModalConductor= false;
  }


  // Mostrar modal para agregar ayudante
  showAddModalAyudante(viaje: Viaje) {
    this.displayDetallesModalAyudante = true;
    this.selectedViaje = viaje;
  }
  hideAddModalAyudante(isClosed: boolean) {
    this.displayDetallesModalAyudante= !isClosed;
  }
  closeModalAyudante() {
    this.displayDetallesModalAyudante= false;
  }


  // Mostrar modal para agregar unidad
  showAddModalUnidad(viaje: Viaje) {
    this.displayDetallesModalUnidad = true;
    this.selectedViaje = viaje;
  }
  hideAddModalUnidad(isClosed: boolean) {
    this.displayDetallesModalUnidad= !isClosed;
  }
  closeModalUnidad() {
    this.displayDetallesModalUnidad= false;
  }






 //obtener unidades
  obtenerUnidadesList() {
    this.unidadService.obtenerUnidades().subscribe(
      response => {
        this.unidades = response;
        this.filteredUnidades = [...this.unidades]; // Copia las unidades al array filtrado inicialmente
      }
    )
  }
 //obtener empleados
  obtenerEmpleadosList() {
    this.empleadoService.obtenerEmpleados().subscribe(
      response => {
        this.empleados = response;
        this.filteredEmpleados = [...this.empleados]; // Copia las empleados al array filtrado inicialmente
      }
    )
  }

  //obtener rutas
  obtenerRutasList() {
    this.rutaService.obtenerRutas().subscribe(
      response => {
        this.rutas = response;
        this.filteredRutas = [...this.rutas]; // Copia las empleados al array filtrado inicialmente
      }
    )
  }


//registro de viajes

registrarViaje() {
  
    // Asigna los valores seleccionados al formulario
    const codigoViaje = this.generarCodigoViaje();
    const { idViaje, ...newViaje } = this.viajeForm.value;
    newViaje.ruta=this.rutaV
    newViaje.codigoViaje = codigoViaje;
    this.viajeService.registrarViaje(newViaje , this.selectedViaje).subscribe(
        response => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Viaje added' });
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
        console.log('Error occurred');
      }
    );
  } 

  
  
  // Guardar nuevo viaje en la lista
  saveViajeToList(newData: any) {
    this.viajes.unshift(newData);
    this.filteredViajes.unshift(newData);
  }

  // Guardar o actualizar viaje en la lista
  saveorUpdateViajeList(newData: any) {
    const index = this.viajes.findIndex(data => data.idViaje === newData.id_Viaje);
    if (index !== -1) {
      this.viajes[index] = newData;
      this.filteredViajes = [...this.viajes]; 
    } else {
      this.viajes.unshift(newData);
      this.filteredViajes.unshift(newData); 
    }
    this.obtenerViajesList();
  }





//editar detalles de viaje

editarViaje() {
  if (!this.selectedViaje) {
    console.error("No hay viaje seleccionado");
    return;
  }

  this.viajeForm2.patchValue({
    idViaje: this.selectedViaje.idViaje,
    codigoViaje: this.selectedViaje.codigoViaje,
    fecha: new Date(this.selectedViaje.fecha),
    horaInicio: new Date(this.selectedViaje.horaInicio),
    horaFin: new Date(this.selectedViaje.horaFin),
    precioNormal: this.selectedViaje.precioNormal,
    precioDiferenciado: this.selectedViaje.precioDiferenciado,
    ruta: this.selectedViaje.ruta,
    estado: this.selectedViaje.estado,
    conductor: this.selectedViaje.conductor,
    ayudante: this.selectedViaje.ayudante,
    unidad: this.selectedViaje.unidad
  });

  const { idViaje, ...editedViaje } = this.viajeForm2.value;
  this.viajeService.registrarViaje(editedViaje, this.selectedViaje).subscribe(
    response => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Viaje updated' });
      this.obtenerViajesList()
    },
    error => {
      // Manejo de errores
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
    }
  );
}


  // Eliminar viaje
  eliminarViaje(viaje: Viaje) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this Viaje?',
      accept: () => {
        this.viajeService.eliminarViaje(viaje.idViaje).subscribe(
          response => {
            this.viajes = this.viajes.filter(data => data.idViaje !== viaje.idViaje);
            this.filteredViajes = this.filteredViajes.filter(data => data.idViaje !== viaje.idViaje);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully' });
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
          }
        );
      }
    });
  }


  // Filtrar viajes
  filterBy(event: any) {
    const value = event?.target?.value.toLowerCase();
    if (value) {
      if (this.selectedFilter === 'codigoViaje') {
        this.viajes = this.viajes.filter(viaje => viaje.codigoViaje.toLowerCase().includes(value));
      } else if (this.selectedFilter === 'ruta') {
        this.viajes = this.viajes.filter(viaje => viaje.ruta?.nombreRuta.toLowerCase().includes(value));
      } else if (this.selectedFilter === 'fecha') {
        this.viajes = this.viajes.filter(viaje => new Date(viaje.fecha).toLocaleDateString('en-GB').includes(value));
      } else if (this.selectedFilter === 'horaInicio') {
        this.viajes = this.viajes.filter(viaje => new Date(viaje.horaInicio).toLocaleTimeString('en-GB', { hour12: false }).includes(value));
      } else if (this.selectedFilter === 'horaFin') {
        this.viajes = this.viajes.filter(viaje => new Date(viaje.horaFin).toLocaleTimeString('en-GB', { hour12: false }).includes(value));
      } else if (this.selectedFilter === 'placaUnidad') {
        this.viajes = this.viajes.filter(viaje => viaje.unidad?.placa.toLowerCase().includes(value));
      } else if (this.selectedFilter === 'conductor') {
        this.viajes = this.viajes.filter(viaje => (viaje.conductor?.nombre.toLowerCase() + ' ' + viaje.conductor?.apellido.toLowerCase()).includes(value));
      } else if (this.selectedFilter === 'ayudante') {
        this.viajes = this.viajes.filter(viaje => (viaje.ayudante?.nombre.toLowerCase() + ' ' + viaje.ayudante?.apellido.toLowerCase()).includes(value));
      } 
      // else if (this.selectedFilter === 'estado') {
      //   const estado = value === "progreso" ? true : (value === "inactivo"? false : null);
      //   console.log("ad1:",estado)
      //   if (estado !== null) {
      //     this.viajes = this.viajes.filter(viaje => viaje.estado === estado);
      //   } else {
      //     // Si el valor de estado no es 'progreso' o 'inactivo', no hacer ningún filtro adicional
      //     //this.viajes = [];
      //     console.log("adada")
      //   }
      
      else if (this.selectedFilter === 'estado') {
        if (value === 'progreso') {
          this.viajes = this.viajes.filter(viaje => viaje.estado === true);
        } else if (value === 'inactivo') {
          this.viajes = this.viajes.filter(viaje => viaje.estado === false);
        } else {
          // Si no se ingresa ni "progreso" ni "inactivo", mostrar todos los viajes
          this.obtenerViajesList();
        }
      // else if (this.selectedFilter === 'estado') {
      //   const estado = value.toLowerCase() === 'progreso' ? true : (value.toLowerCase() === 'inactivo' ? false : null);
      //   this.viajes = this.viajes.filter(viaje => viaje.estado === estado);
      }

      } else {
      this.obtenerViajesList();
    }
  }


//filtro de empleados
filterByE(event: any) {
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
        this.obtenerEmpleadosList();
      }
  }

//filtro de unidad
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
          this.obtenerUnidadesList();
        }
    
      }

//filtro de ruta
filterByR(event: any) {
        const value = event?.target?.value;
        if (value) {
          if (this.selectedFilter === 'nombreCompania') {
            this.rutas = this.rutas.filter(ruta => ruta.compania.nombreCompania.toLowerCase().includes(value.toLowerCase()));
          } else if (this.selectedFilter === 'nombreRuta') {
            this.rutas = this.rutas.filter(ruta => ruta.nombreRuta.toLowerCase().includes(value.toLowerCase()));
          } else if (this.selectedFilter === 'origenRuta') {
            this.rutas = this.rutas.filter(ruta => ruta.origenRuta.toLowerCase().includes(value.toLowerCase()));
          } else if (this.selectedFilter === 'destinoRuta') {
            this.rutas = this.rutas.filter(ruta => ruta.destinoRuta.toLowerCase().includes(value.toLowerCase()));
          }
        }else {
              // Si no se ha ingresado nada en el input, muestra todas las rutas nuevamente
              this.obtenerRutasList();
            }
        }
        

//seleccionar conductor
seleccionarConductor(empleado: any){
try {
  this.selectedEmpleadoC = empleado;
  if (!this.selectedEmpleadoC) {
    throw new Error('No se ha seleccionado ninguna fila.');
  }
  this.conductorV = {
    idEmpleado: this.selectedEmpleadoC.idEmpleado, 
    cedula: this.selectedEmpleadoC?.cedula, 
    nombre: this.selectedEmpleadoC.nombre, 
    apellido: this.selectedEmpleadoC.apellido,
    direccion: this.selectedEmpleadoC.direccion,
    tipo: this.selectedEmpleadoC.tipo,
    codigoAcceso: this.selectedEmpleadoC.codigoAcceso,
  };

    this.selectedViaje.conductor=this.conductorV;
   this.viajeForm2.patchValue({
    conductor: this.conductorV
  });
  this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Conductor asignada correctamente.' });
  this.closeModalAyudante();

} catch (error) {
  console.error('Error:', error);
}
      }

//seleccionar ayudante
seleccionarAyudante(empleado: any){

try {
  this.selectedEmpleadoA = empleado;
  if (!this.selectedEmpleadoA) {
    throw new Error('No se ha seleccionado ninguna fila.');
  }

  this.ayudanteV= {
    idEmpleado: this.selectedEmpleadoA.idEmpleado, 
    cedula: this.selectedEmpleadoA?.cedula, 
    nombre: this.selectedEmpleadoA.nombre, 
    apellido: this.selectedEmpleadoA.apellido,
    direccion: this.selectedEmpleadoA.direccion,
    tipo: this.selectedEmpleadoA.tipo,
    codigoAcceso: this.selectedEmpleadoA.codigoAcceso,
  }
  this.selectedViaje.ayudante=this.ayudanteV;
  this.viajeForm2.patchValue({
    ayudante:this.ayudanteV
  });
  this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Ayudante asignada correctamente.' });
} catch (error) {
  console.error('Error:', error);
}

      }

//seleccionar unidad
seleccionarUnidad(unidad: any){
try {
  this.selectedUnidad = unidad;
  if (!this.selectedUnidad) {
    throw new Error('No se ha seleccionado ninguna fila.');
  }
  this.unidadV = {
    idUnidad: this.selectedUnidad.idUnidad, 
    codigoUnidad: this.selectedUnidad.codigoUnidad, 
    placa: this.selectedUnidad.placa, 
    cantidadAsientos: this.selectedUnidad.cantidadAsientos,
    estado: this.selectedUnidad.estado,
  };
  this.selectedViaje.unidad=this.unidadV;
  this.viajeForm2.patchValue({
    unidad:this.unidadV
  });
  this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Unidad asignada correctamente.' });
} catch (error) {
  console.error('Error:', error);
}

      }

//seleccionar ruta   
seleccionarRuta(ruta: any){
  try {
  this.selectedRuta= ruta;
  if (!this.selectedRuta) {
    throw new Error('No se ha seleccionado ninguna fila.');
  }
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
} catch (error) {
  console.error('Error:', error);
}
      }
    
  //genera un codigo de viaje
  generarCodigoViaje(): string {
          const fechaActual = new Date();
          const codigoAleatorio = Math.floor(Math.random() * 1000); // Número aleatorio entre 0 y 999
          return `${fechaActual.getFullYear()}${fechaActual.getMonth() + 1}${fechaActual.getDate()}-${codigoAleatorio}`;
        }  
}
