
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RutaService } from '../../../service/ruta.service';
import { ParadaService } from '../../../service/parada.service';
import { Parada } from '../../../interface/parada';
import { Subscription } from 'rxjs';
import { Ruta } from '../../../interface/ruta';
import { ParadaRutaService } from '../../../service/paradaRuta.service';
import { ParadaRuta } from '../../../interface/paradaruta';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-paradasderuta',
  templateUrl: './paradasderuta.component.html',
  styleUrl: './paradasderuta.component.css'
})
export class ParadasDeRutaComponent implements OnInit{

modalType = "Registrar";
  
//obtiene ruta actual
idRutaEnviar:any ;
selectedRuta!: Ruta | null;
paradas: Parada[] = [];
paradasDeRuta: ParadaRuta[] = [];
filteredParadas: Parada[] = [];
filteredParadasDeRuta: ParadaRuta[] = [];
searchTerm: string = '';
selectedParada: any = null;
subscriptions: Subscription[] = [];
selectedFilter: string = '';

displayAddModal = false;
displayBuscarModal = false;

//mostrar informacion de ruta
  rutaForm = this.fb.group({
    idRuta: [""],
    nombreCompania: ["", Validators.required],
  });

//  para tabla de paradas de ruta
  paradasRuta: {
    ruta:Ruta;
    parada: Parada;
    orden: any;
  }[] = [];

  //formulario para crear nueva parada
  paradaForm = this.fb.group({
    idParada: [""],
    nombreParada: ["", Validators.required],
    direccion: ["", Validators.required],
    latitud: ["", Validators.required],
    longitud: ["", Validators.required]
  });

//lista para guardar paradas creadas
  paradascreadas: {
    nombreParada: any;
    direccion: any;
    latitud: String;
    longitud: String;
  }[] = [];

//lista para mostrar paradasde ruta
paradasrutamostrar: {
  idRuta: any;
  nombreRuta: any;
  idParada: any;
  nombreParada: any;
  direccion: any;
  latitud: String;
  longitud: String;
  orden: any;
}[] = [];

  constructor(
    private fb: FormBuilder,
    private rutaService: RutaService,
    private messageService: MessageService, 
    private paradaService: ParadaService,
    private paradaRutaService: ParadaRutaService,
    private confirmationService: ConfirmationService,
    private route: ActivatedRoute,
    private router:Router
   ) { }
    
    
  ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        this.idRutaEnviar = params.get('idRuta');
        this.obtenerRuta();
      });
      this.obtenerParadasList();
      this.obtenerParadasRutaList(); // Llamar aquí para asegurarse de que paradasDeRuta se actualice antes de acceder a ella

    }
    
  ngOnDestroy(): void {
      this.subscriptions.forEach(sub => sub.unsubscribe());
    }

  ngOnChanges(): void {
      if (this.selectedRuta) {
        this.rutaForm.patchValue({
          idRuta: this.selectedRuta.idRuta.toString(),
          nombreCompania: this.selectedRuta.compania.nombreCompania.toString(),
        });
        this.idRutaEnviar = this.selectedRuta.idRuta;
        this.obtenerParadasList();
        this.obtenerParadasRutaList();
      } else {
        this.paradasDeRuta = []; // Limpiar paradasDeRuta si no hay ruta seleccionada
        this.paradasrutamostrar = []; // Limpiar paradasrutamostrar si no hay ruta seleccionada
      }
    }

    //agregar parada
  showAddModal() {
    this.displayAddModal = true;
  }
  hideAddModal(isClosed: boolean) {
    this.displayAddModal = !isClosed;

  }
  //cierra el modal de agregar parada
  closeModal() {
    //this.rutaForm.reset();
    this.paradaForm.reset();
          }
  //resetea el formulario
  cancelar() {
    this.paradaForm.reset();
     }

  //buscar paradas
  showBuscarModal() {
    this.displayBuscarModal = true;
  }
  hideBuscarModal(isClosed: boolean) {
    this.displayBuscarModal = !isClosed;

  }
  closeModalBuscar() {
    }


  //obtener rutas 
  obtenerRuta(): void {
      this.rutaService.obtenerRutaporId(this.idRutaEnviar).subscribe(
        (ruta: Ruta) => {
          this.selectedRuta = ruta;
          this.rutaForm.patchValue({
            idRuta: this.selectedRuta.idRuta.toString(), // Utilizar operador de fusión nulo para manejar valores null
            nombreCompania: this.selectedRuta.compania.nombreCompania.toString(), // Utilizar operador de fusión nulo para manejar valores null
          });
        },
        error => {
          console.error('Error al obtener la ruta:', error);
        }
      );
    }
  
//obtiene todas la paradas disponibles
  obtenerParadasList() {
    this.paradaService.obtenerParadas().subscribe(
      response => {
        this.paradas = response;
        this.filteredParadas = [...this.paradas]; // Copia las paradas al array filtrado inicialmente
      }
    )
    
  }
  //obtener paradas de la ruta
  obtenerParadasRutaList() {
    if (this.idRutaEnviar) {
      this.paradaRutaService.obtenerParadasRutaByRutaId(this.idRutaEnviar).subscribe(
        response => {
          this.paradasDeRuta = response.sort((a, b) => a.orden - b.orden);
          this.cargarListaRutas(); 
        },
        error => {
          console.error('Error al obtener paradas de la ruta:', error);
        }
      );
    }
  }

//cargar en lista de rutas de parada
  cargarListaRutas(){

  this.paradasrutamostrar = this.paradasDeRuta.map(paradaRuta => ({
    idRuta: paradaRuta.ruta.idRuta,
    nombreRuta: paradaRuta.ruta.nombreRuta,
    idParada: paradaRuta.parada.idParada,
    nombreParada: paradaRuta.parada.nombreParada,
    direccion: paradaRuta.parada.direccion,
    latitud: paradaRuta.parada.latitud,
    longitud: paradaRuta.parada.longitud,
    orden: paradaRuta.orden
  }));

  //console.log(this.paradasrutamostrar)
}


//filtro de paradas
filterBy(event: any) {
const value = event?.target?.value;
if (value) {

  if (this.selectedFilter === 'nombreParada') {
    this.paradas = this.paradas.filter(parada => parada.nombreParada.toLowerCase().includes(value.toLowerCase()));
  } else if (this.selectedFilter === 'direccion') {
    this.paradas = this.paradas.filter(parada => parada.direccion.toLowerCase().includes(value.toLowerCase()));
  } 
}else {
      // Si no se ha ingresado nada en el input, muestra todas las paradas nuevamente
      this.obtenerParadasList();
    }
}

//si ya existe parada se selecciona
asignarParadaSeleccionada(parada: any) {
  try {
    this.selectedParada = parada;
    if (!this.selectedParada) {
      throw new Error('No se ha seleccionado ninguna fila.');
    }
    const nuevaParadaRuta = {
      idRuta: this.selectedRuta?.idRuta, 
      nombreRuta: this.selectedRuta?.nombreRuta, 
      idParada: this.selectedParada.idParada, 
      nombreParada: this.selectedParada.nombreParada,
      direccion: this.selectedParada.direccion,
      latitud: this.selectedParada.latitud,
      longitud: this.selectedParada.longitud,
      orden: this.paradasrutamostrar.length + 1
    };
    // Agrega la nueva parada de ruta al arreglo de paradasruta
    this.paradasrutamostrar.push(nuevaParadaRuta);
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Parada asignada correctamente.' });
  } catch (error) {
    console.error('Error:', error);
  }
}
//si no existe parada se crea
asignarParadaCreada(): void {
  // Verifica si hay una ruta seleccionada
  if (!this.selectedRuta) {
    console.error('No se ha seleccionado ninguna ruta.');
    return;
  }
   // Verifica si el formulario de parada es null
   if (!this.paradaForm) {
    console.error('El formulario de parada es null.');
    return;
  }
  // Obtén los valores del formulario de creación de paradas
  const nombreParada = this.paradaForm.get('nombreParada')?.value;
  const direccion = this.paradaForm.get('direccion')?.value;
  const latitud = this.paradaForm.get('latitud')?.value;
  const longitud = this.paradaForm.get('longitud')?.value;
  // Verifica si alguno de los valores del formulario es null o undefined
  if (nombreParada == null || direccion == null || latitud == null || longitud == null) {
    console.error('Alguno de los campos del formulario es null o undefined.');
    return;
  }
  // Agrega la nueva parada a la lista de paradas de rutas
  const nuevaParada = {
    idRuta: this.selectedRuta.idRuta,
    nombreRuta: this.selectedRuta.nombreRuta,
    idParada: null, // Esto puede ser null si no tienes un id asignado
    nombreParada: nombreParada,
    direccion: direccion,
    latitud: latitud,
    longitud: longitud,
    orden: this.paradasrutamostrar.length + 1
  };

  this.paradasrutamostrar.push(nuevaParada);
  this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Parada creada' });
  this.paradaForm.reset();

}

//elimina parada
eliminarParada(index: number): void {
  if (index >= 0 && index < this.paradasrutamostrar.length) {
    this.paradasrutamostrar.splice(index, 1);
     this.paradasrutamostrar.forEach((parada, newIndex) => {
      parada.orden = newIndex + 1; // Sumamos 1 para que la primera parada tenga orden 1
    });
    //this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Parada eliminada correctamente.' });
  } else {
    console.error('Índice fuera de rango.');
  }
}
//orden
subirFila(index: number) {
  if (index > 0) {
    const filaActual = this.paradasrutamostrar[index];
    const filaAnterior = this.paradasrutamostrar[index - 1];
    this.paradasrutamostrar[index - 1] = filaActual;
    this.paradasrutamostrar[index] = filaAnterior;
  }
  this.actualizarOrdenParadasRuta()
}
bajarFila(index: number) {
  if (index < this.paradasrutamostrar.length - 1) {
    const filaActual = this.paradasrutamostrar[index];
    const filaSiguiente = this.paradasrutamostrar[index + 1];
    this.paradasrutamostrar[index + 1] = filaActual;
    this.paradasrutamostrar[index] = filaSiguiente;
    this.actualizarOrdenParadasRuta()
  }
 
}
//actualza orden
actualizarOrdenParadasRuta() {
  this.paradasrutamostrar.forEach((parada, index) => {
    parada.orden = index + 1; 
  });
}



//guarda en lista las paradas creadas y seleccionadas
guardarParadasRuta() {
    // Iterar sobre la lista paradasrutamostrar
    this.paradasrutamostrar.forEach(parada => {
      if (parada.idParada) {
        this.paradasRuta.push({
          ruta: this.selectedRuta!,
          parada: parada,
          orden: parada.orden
        });
      } else {
        // Si no hay un idParada, crear y guardar la parada antes de agregarla a paradasRuta
        const nuevaParada = {
          nombreParada: parada.nombreParada,
          direccion: parada.direccion,
          latitud: parada.latitud,
          longitud: parada.longitud
        };
        this.paradaService.agregarParada(nuevaParada).subscribe(
          (respuesta: any) => {
            // Seleccionar solo las propiedades necesarias de respuesta.data
            const { idParada, nombreParada, direccion, latitud, longitud } = respuesta.data;
            // Una vez que se guarda la parada, agregarla a paradasRuta con su orden
            this.paradasRuta.push({
              ruta: this.selectedRuta!,
              parada: {
                idParada,
                nombreParada,
                direccion,
                latitud,
                longitud
              },
              orden: parada.orden
            });
          },
          (error: any) => {
            console.error('Error al guardar la parada:', error);
          }
        );
      }
    }
  );

  this.agregarNuevosRegistrosParadasRuta();
}

//registra las paradas de ruta
agregarNuevosRegistrosParadasRuta() {
  this.limpiarRegistrosParadasRuta().then(() => {
    this.registrarParadasRuta();
  }).catch(error => {
    console.error('Error al limpiar registros de paradas de ruta:', error);
  });
}

//limpia registros de parada para crear nuevamente paradas
limpiarRegistrosParadasRuta() {
  return new Promise<void>((resolve, reject) => {
    // Llamar al servicio para eliminar registros de paradas de ruta por ID de ruta
    this.paradaRutaService.eliminarParadaRutaByRutaId(this.idRutaEnviar).subscribe(
      () => {
        // Éxito al eliminar registros
        console.log('Registros de paradas de ruta eliminados correctamente.');
        resolve();
      },
      error => {
     
        console.error('Error al eliminar registros de paradas de ruta:', error);
        reject(error);
      }
    );
  });
}

registrarParadasRuta() {
  this.paradasRuta.forEach(paradaRuta => {
    this.paradaRutaService.addParadaRuta(paradaRuta).subscribe(
      response => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'ParadaRuta asignada correctamente.' });
      },
      error => {
        console.error('Error al guardar ParadaRuta:', error);
      }
    );
  });
  
}

//regresa a pestaña de rutas
regresar(){
  this.router.navigate(['/dashboard/rutas']);
}

}






