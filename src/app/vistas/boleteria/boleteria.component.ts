import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

import { Viaje } from '../../interface/viaje';
import { ViajeService } from '../../service/viaje.service';
import { FormBuilder, Validators } from '@angular/forms';
import { BoletoService } from '../../service/boletos.service';
import { Asiento } from '../../interface/asiento';
import { Boleto } from '../../interface/boleto';

@Component({
  selector: 'app-boleteria',
  templateUrl: './boleteria.component.html',
  styleUrls: ['./boleteria.component.css']
})
export class BoleteriaComponent implements OnInit, OnDestroy {


  selectedEstado: string = '';
  subscriptions: Subscription[] = [];
  selectedFilter: string = ''; // Preselección del filtro

  displayDetallesModalAsiento=false;
  displayDetallesModalViaje=false;

  viajes: Viaje[] = [];
  filteredViajes: Viaje[] = [];
  searchTerm: string = '';
  selectedViaje: any = null;
  filterValue: string = '';

  asientos: Asiento[] = [];

  viajeB: Viaje|any;
  selectedAsientos: Asiento[] = [];

  boletoForm = this.fb.group({
    idBoleto: [""],
    numeroCedula: ["", Validators.required],
    cantidadNormal:null,
    cantidadDiferencial:null,
    asiento: null,
    viaje: null
  });


  constructor(
    private fb: FormBuilder,
    private viajeService: ViajeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private asientoService: BoletoService,
    private boletoService: BoletoService
  ) { }

  ngOnInit(): void {
    //this.obtenerCompaniasList();
    //this.applyDefaultFilter(); // Aplicar filtro por defecto al iniciar
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }




// // Mostrar modal para agregar viaje
showAddModalViaje() {
  console.log("asasasas")
  this.displayDetallesModalViaje = true;
  this.obtenerViajesList();
}
closeModalViaje() {
  this.displayDetallesModalViaje= false;
}


showAddModalAsientos() {
  this.displayDetallesModalAsiento = true;
  //this.obtenerViajesList();

}

closeModalAsientos() {
  this.displayDetallesModalAsiento= false;
}


  // Obtener lista de viajes
  obtenerViajesList() {
    this.viajeService.obtenerViajes().subscribe(response => {
      this.viajes = response;
      this.filteredViajes = [...this.viajes]; 
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
      } 
      } else {
      this.obtenerViajesList();
    }
  }

  seleccionarViaje(viaje: any){

    try {
    this.selectedViaje= viaje;
  
    if (!this.selectedViaje) {
      throw new Error('No se ha seleccionado ninguna fila.');
    }
  
    console.log('Objeto ruta', this.selectedViaje);

    // Agrega condcutor  seleccionada a la objeto conductor      
    this.viajeB = {
      idViaje: this.selectedViaje.idViaje, 
    };


    this.boletoForm.patchValue({
      viaje:this.viajeB
    });

    this.loadAsientos(this.selectedViaje.unidad.idUnidad);
    
    // Opcionalmente, puedes enviar un mensaje de éxito
    //this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Ruta asignada correctamente.' });
  
  
  } catch (error) {
    console.error('Error:', error);
  }
        }


  


  //asientos de unidad


  loadAsientos(idUnidad: number): void {
    console.log(idUnidad)

    if (idUnidad) {
      this.asientoService. obtenerAsientosByUnidadId(idUnidad).subscribe(
        response => {
          this.asientos = response;
          //this.cargarListaRutas(); 
          console.log(this.asientos)
        },
        error => {
          console.error('Error al obtener paradas de la ruta:', error);
        }
      );
    }


  }


  getAsientosDisponibles(): number {
    return this.asientos.filter(asiento => !asiento.estado).length;
  }

  

  onAsientoSelect(asiento: Asiento, event: any): void {
    if (event.target.checked) {
      this.selectedAsientos.push(asiento);
    } else {
      const index = this.selectedAsientos.indexOf(asiento);
      if (index > -1) {
        this.selectedAsientos.splice(index, 1);
      }
    }
  }

  confirmarSeleccion(): void {
    console.log('Asientos seleccionados:', this.selectedAsientos);
    // Aquí puedes agregar la lógica para confirmar la selección de asientos
  }




  registrarBoleto(){
    console.log("ingresaaa")

    // Verificar que hayan asientos seleccionados
  if (!this.selectedAsientos || this.selectedAsientos.length === 0) {
    console.error("No hay asientos seleccionados para registrar boletos.");
    return;
  }

  // Obtener el número de cédula del formulario
  const numeroCedula = this.boletoForm.get('numeroCedula')?.value;

  // Verificar que se haya ingresado un número de cédula
  if (!numeroCedula) {
    console.error("El número de cédula no puede estar vacío.");
    return;
  }


// Recorrer los asientos seleccionados
this.selectedAsientos.forEach(asiento => {
  // Crear un objeto Boleto
  const nuevoBoleto: any = {
    numeroCedula: numeroCedula, // Puedes usar un valor temporal para el número de cédula
    asiento: asiento, // Asignar el asiento seleccionado al boleto
    viaje: this.selectedViaje // Asignar el viaje actual al boleto
  };

  console.log(nuevoBoleto)

      this.boletoService.registrarBoleto(nuevoBoleto).subscribe(

        response => {
        
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Boleto Registrada' });
        
        
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
          console.log('Error occurred');
        }
      );


//   // Llamar al servicio para guardar el boleto
//   this.boletoService.guardarBoleto(nuevoBoleto).subscribe(
//     response => {
//       // Aquí puedes manejar la respuesta del servidor
//       console.log("Boleto guardado:", response);
//     },
//     error => {
//       // Manejo de errores
//       console.error("Error al guardar el boleto:", error);
//     }
//   );
 }


);

this.boletoForm.reset();
this.selectedViaje=null;
this.asientos=[];

}
  

  cancelarBoleto(){
    console.log("ingresaaacancelar")
  }
}
