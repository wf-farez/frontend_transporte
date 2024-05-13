// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { FormBuilder, Validators } from '@angular/forms';
// import { ConfirmationService, MessageService } from 'primeng/api';
// import { RutaService } from '../../service/ruta.service';
// import { ParadaService } from '../../service/parada.service';
// import { Parada } from '../../interface/parada';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-paradasruta',
//   templateUrl: './paradasruta.component.html',
//   styleUrl: './paradasruta.component.css'
// })
// export class ParadasrutaComponent implements OnInit{

//   @Input() displayAsignarModal: boolean = true;
//   @Input() selectedRuta: any = null;
//   @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
//   @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
//   modalType = "Asignar";
  
//   rutaForm = this.fb.group({
//     idRuta: [""],
//     nombreCompania: ["", Validators.required],
//   });

//   paradaForm = this.fb.group({
//     idParada: [""],
//     nombreParada: ["", Validators.required],
//     direccion: ["", Validators.required],
//     latitud: ["", Validators.required],
//     longitud: ["", Validators.required],
//   });

  
// paradasruta: {
//   idRuta: any;
//   nombreRuta: any;
//   idParada: any;
//   nombreParada: any;
//   direccion: any;
//   latitud: any;
//   longitud: any;
//   orden: any;
// }[] = [];

//   constructor(private fb: FormBuilder, private rutaService: RutaService,
//     private messageService: MessageService,  private paradaService: ParadaService,
//     private confirmationService: ConfirmationService,
//    ) { }
    
//     paradas: Parada[] = [];
//     filteredParadas: Parada[] = [];
//     searchTerm: string = '';
  
//     selectedParada: any = null;
//     selectedlongitud: string = '';
//     subscriptions: Subscription[] = [];
   
  
//     selectedFilter: string = '';
//     filterValue: string = '';

//   ngOnInit(): void {
//     this.getParadasList();
//   }

//   getParadasList() {
//     this.paradaService.getParadas().subscribe(
//       response => {
//         this.paradas = response;
//         this.filteredParadas = [...this.paradas]; // Copia las paradas al array filtrado inicialmente
//       }
//     )
//   }



// closeModal() {
//   this.rutaForm.reset();
//     this.clickClose.emit(true);
//     }


// ngOnChanges(): void {
//   if (this.selectedRuta) {
//         this.modalType = 'Asignar';
//         this.rutaForm.patchValue({
//           idRuta: this.selectedRuta.idRuta,
//           nombreCompania: this.selectedRuta.nombreCompania,
//         });
//       } 
//     }





// filterBy(event: any) {
// const value = event?.target?.value;
// if (value) {
//   if (this.selectedFilter === 'nombreParada') {
//     this.paradas = this.paradas.filter(parada => parada.nombreParada.toLowerCase().includes(value.toLowerCase()));
//   } else if (this.selectedFilter === 'direccion') {
//     this.paradas = this.paradas.filter(parada => parada.direccion.toLowerCase().includes(value.toLowerCase()));
//   } else if (this.selectedFilter === 'latitud') {
//     const floatValue = parseFloat(value); // Convertir el valor a número entero
//     this.paradas = this.paradas.filter(parada => parada.latitud.toString().includes(floatValue.toString()));
//   } else if (this.selectedFilter === 'longitud') {
//     const floatValue = parseFloat(value);
//     this.paradas = this.paradas.filter(parada => parada.longitud.toString().includes(floatValue.toString()));
//   }
// }else {
//       // Si no se ha ingresado nada en el input, muestra todas las paradas nuevamente
//       this.getParadasList();
//     }


// }


// asignarParadaSeleccionada(parada: any) {
  
//   try {
//     this.selectedParada = parada;

//     if (!this.selectedParada) {
//       throw new Error('No se ha seleccionado ninguna fila.');
//     }

//     console.log('Objeto parada:', this.selectedParada);

//     // Agrega la parada seleccionada a la tabla de paradas de la ruta
//     const nuevaParadaRuta = {
//       idRuta: 1, // Asigna el valor correcto para idRuta
//       nombreRuta: this.selectedRuta?.nombreRuta, // Asigna el valor correcto para nombreRuta
//       idParada: this.selectedParada.idParada, // Usa el id de la parada seleccionada
//       nombreParada: this.selectedParada.nombreParada,
//       direccion: this.selectedParada.direccion,
//       latitud: this.selectedParada.latitud,
//       longitud: this.selectedParada.longitud,
//       orden: this.paradasruta.length + 1
//     };

//     // Agrega la nueva parada de ruta al arreglo de paradasruta
//     this.paradasruta.push(nuevaParadaRuta);

//     // Opcionalmente, puedes enviar un mensaje de éxito
//     this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Parada asignada correctamente.' });

//   } catch (error) {
//     console.error('Error:', error);
//   }
// }


// asignarParadaCreada(): void {
//   // Verifica si hay una ruta seleccionada
//   if (!this.selectedRuta) {
//     console.error('No se ha seleccionado ninguna ruta.');
//     return;
//   }

//    // Verifica si el formulario de parada es null
//    if (!this.paradaForm) {
//     console.error('El formulario de parada es null.');
//     return;
//   }

//   // Obtén los valores del formulario de creación de paradas
//   const nombreParada = this.paradaForm.get('nombreParada')?.value;
//   const direccion = this.paradaForm.get('direccion')?.value;
//   const latitud = this.paradaForm.get('latitud')?.value;
//   const longitud = this.paradaForm.get('longitud')?.value;

//   // Verifica si alguno de los valores del formulario es null o undefined
//   if (nombreParada == null || direccion == null || latitud == null || longitud == null) {
//     console.error('Alguno de los campos del formulario es null o undefined.');
//     return;
//   }

//   // Agrega la nueva parada a la lista de paradas de rutas
//   const nuevaParada = {
//     idRuta: this.selectedRuta.idRuta,
//     nombreRuta: this.selectedRuta.nombreRuta,
//     idParada: null, // Esto puede ser null si no tienes un id asignado
//     nombreParada: nombreParada,
//     direccion: direccion,
//     latitud: latitud,
//     longitud: longitud,
//     orden: this.paradasruta.length + 1
//   };
//   this.paradasruta.push(nuevaParada);
//   // Limpia el formulario después de agregar la parada
//   this.paradaForm.reset();
// }


// eliminarParada(index: number): void {
//   // Verifica que el índice esté dentro del rango de la lista de paradasruta
//   if (index >= 0 && index < this.paradasruta.length) {
//     // Elimina la fila en el índice especificado
//     this.paradasruta.splice(index, 1);
//     // Opcionalmente, puedes enviar un mensaje de éxito
//     this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Parada eliminada correctamente.' });
//   } else {
//     console.error('Índice fuera de rango.');
//   }
// }


// subirFila(index: number) {
//   if (index > 0) {
//     const filaActual = this.paradasruta[index];
//     const filaAnterior = this.paradasruta[index - 1];
//     this.paradasruta[index - 1] = filaActual;
//     this.paradasruta[index] = filaAnterior;
//   }
//   this.actualizarOrdenParadasRuta()
// }

// bajarFila(index: number) {
//   if (index < this.paradasruta.length - 1) {
//     const filaActual = this.paradasruta[index];
//     const filaSiguiente = this.paradasruta[index + 1];
//     this.paradasruta[index + 1] = filaActual;
//     this.paradasruta[index] = filaSiguiente;
//     this.actualizarOrdenParadasRuta()
//   }
 
// }


// actualizarOrdenParadasRuta() {
//   // Actualizar el orden de las paradas de ruta después de subir o bajar la fila
//   this.paradasruta.forEach((parada, index) => {
//     parada.orden = index + 1; // Asignar el nuevo orden basado en el índice actual
//   });
// }

// }






import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RutaService } from '../../service/ruta.service';
import { ParadaService } from '../../service/parada.service';
import { Parada } from '../../interface/parada';
import { Subscription } from 'rxjs';
import { Ruta } from '../../interface/ruta';
import { ParadaRutaService } from '../../service/paradaRuta.service';
import { ParadaRuta } from '../../interface/paradaruta';

@Component({
  selector: 'app-paradasruta',
  templateUrl: './paradasruta.component.html',
  styleUrl: './paradasruta.component.css'
})
export class ParadasrutaComponent implements OnInit{

  @Input() displayAsignarModal: boolean = true;
  @Input() selectedRuta: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  modalType = "Asignar";
  
 

  rutaForm = this.fb.group({
    idRuta: [""],
    nombreCompania: ["", Validators.required],
  });

  paradasRuta: {
    ruta:Ruta;
    parada: Parada;
    orden: any;
  }[] = [];

  paradaForm = this.fb.group({
    idParada: [""],
    nombreParada: ["", Validators.required],
    direccion: ["", Validators.required],
    latitud: [0, Validators.required],
    longitud: [0, Validators.required]
  });

  paradascreadas: {
    nombreParada: any;
    direccion: any;
    latitud: number;
    longitud: number;
  }[] = [];

paradasrutamostrar: {
  idRuta: any;
  nombreRuta: any;
  idParada: any;
  nombreParada: any;
  direccion: any;
  latitud: number;
  longitud: number;
  orden: any;
}[] = [];

  idRutaEnviar: any;

  constructor(private fb: FormBuilder, private rutaService: RutaService,
    private messageService: MessageService,  private paradaService: ParadaService,private paradaRutaService: ParadaRutaService,
    private confirmationService: ConfirmationService,
    
   ) { }
    
    paradas: Parada[] = [];
    //paradascreadas: Parada[] = [];
    paradasDeRuta: ParadaRuta[] = [];

    filteredParadas: Parada[] = [];
    filteredParadasDeRuta: ParadaRuta[] = [];
    searchTerm: string = '';
    selectedParada: any = null;
    selectedlongitud: string = '';
    subscriptions: Subscription[] = [];

    selectedFilter: string = '';
    filterValue: string = '';

  ngOnInit(): void {
 
      // this.idRutaEnviar=this.selectedRuta.currentValue.idRuta;
      this.getParadasList();
      // this.getParadasRutaList();
      // console.log(this.idRutaEnviar)
      // console.log(this.paradas)
      // console.log(this.paradasDeRuta)
      // console.log(this.paradasrutamostrar)

    

  }

  getParadasList() {
    this.paradaService.getParadas().subscribe(
      response => {
        this.paradas = response;
        this.filteredParadas = [...this.paradas]; // Copia las paradas al array filtrado inicialmente
      }
    )
    
  }

  getParadasRutaList() {

    if (this.idRutaEnviar) {
      this.paradaRutaService.getParadasRutaByRutaId(this.idRutaEnviar).subscribe(
        response => {
          this.paradasDeRuta = response;
          //this.filteredParadasDeRuta = [...this.paradasDeRuta]; // Copia las paradas de ruta al array filtrado inicialmente
        }
      );
    }
  }

getasignar(){
  this.paradasrutamostrar = this.paradasDeRuta.map(paradaRuta => ({
    idRuta: paradaRuta.Ruta.idRuta,
    nombreRuta: paradaRuta.Ruta.nombreRuta,
    idParada: paradaRuta.Parada.idParada,
    nombreParada: paradaRuta.Parada.nombreParada,
    direccion: paradaRuta.Parada.direccion,
    latitud: paradaRuta.Parada.latitud,
    longitud: paradaRuta.Parada.longitud,
    orden: paradaRuta.orden
  }));
}

closeModal() {
  this.rutaForm.reset();
    this.clickClose.emit(true);
    }


ngOnChanges(): void {
  if(this.selectedRuta) {
        this.modalType = 'Asignar';
        this.rutaForm.patchValue({
          idRuta: this.selectedRuta.idRuta,
          nombreCompania: this.selectedRuta.nombreCompania,
        });

      //   this.idRutaEnviar=this.selectedRuta.idRuta;
      //   this.getParadasList();
      //   this.getParadasRutaList();
      //   //this.getasignar();
      //   console.log(this.idRutaEnviar)
      //   console.log(this.paradas)
      //   console.log(this.paradasDeRuta)
      //   console.log(this.paradasrutamostrar)
      } 
      
    }


filterBy(event: any) {
const value = event?.target?.value;
if (value) {
  if (this.selectedFilter === 'nombreParada') {
    this.paradas = this.paradas.filter(parada => parada.nombreParada.toLowerCase().includes(value.toLowerCase()));
  } else if (this.selectedFilter === 'direccion') {
    this.paradas = this.paradas.filter(parada => parada.direccion.toLowerCase().includes(value.toLowerCase()));
  } else if (this.selectedFilter === 'latitud') {
    const floatValue = parseFloat(value); // Convertir el valor a número entero
    this.paradas = this.paradas.filter(parada => parada.latitud.toString().includes(floatValue.toString()));
  } else if (this.selectedFilter === 'longitud') {
    const floatValue = parseFloat(value);
    this.paradas = this.paradas.filter(parada => parada.longitud.toString().includes(floatValue.toString()));
  }
}else {
      // Si no se ha ingresado nada en el input, muestra todas las paradas nuevamente
      this.getParadasList();
    }


}


asignarParadaSeleccionada(parada: any) {
  
  try {
    this.selectedParada = parada;

    if (!this.selectedParada) {
      throw new Error('No se ha seleccionado ninguna fila.');
    }

    console.log('Objeto parada:', this.selectedParada);

    // Agrega la parada seleccionada a la tabla de paradas de la ruta
    const nuevaParadaRuta = {
      idRuta: this.selectedRuta.idRuta, // Asigna el valor correcto para idRuta
      nombreRuta: this.selectedRuta?.nombreRuta, // Asigna el valor correcto para nombreRuta
      idParada: this.selectedParada.idParada, // Usa el id de la parada seleccionada
      nombreParada: this.selectedParada.nombreParada,
      direccion: this.selectedParada.direccion,
      latitud: this.selectedParada.latitud,
      longitud: this.selectedParada.longitud,
      orden: this.paradasrutamostrar.length + 1
    };

    // Agrega la nueva parada de ruta al arreglo de paradasruta
    this.paradasrutamostrar.push(nuevaParadaRuta);

    // Opcionalmente, puedes enviar un mensaje de éxito
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Parada asignada correctamente.' });

  } catch (error) {
    console.error('Error:', error);
  }
}


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
  console.log('lista paadas creadas',this.paradascreadas)
  // Limpia el formulario después de agregar la parada
  this.paradaForm.reset();
}


eliminarParada(index: number): void {
  // Verifica que el índice esté dentro del rango de la lista de paradasruta
  if (index >= 0 && index < this.paradasrutamostrar.length) {
    // Elimina la fila en el índice especificado
    this.paradasrutamostrar.splice(index, 1);
    // Opcionalmente, puedes enviar un mensaje de éxito
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Parada eliminada correctamente.' });
  } else {
    console.error('Índice fuera de rango.');
  }
}


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

actualizarOrdenParadasRuta() {
  // Actualizar el orden de las paradas de ruta después de subir o bajar la fila
  this.paradasrutamostrar.forEach((parada, index) => {
    parada.orden = index + 1; // Asignar el nuevo orden basado en el índice actual
  });
}


guardarParadasRuta() {
  if (this.modalType === 'Asignar') {
    // Iterar sobre la lista paradasrutamostrar
    this.paradasrutamostrar.forEach(parada => {
      // Verificar si hay un idParada
      if (parada.idParada) {
        // Si hay un idParada, agregar todo el objeto parada a la lista paradasRuta
        this.paradasRuta.push({
          ruta: this.selectedRuta,
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

        this.paradaService.addParada(nuevaParada).subscribe(
          (respuesta: any) => {
            // Una vez que se guarda la parada, agregarla a paradasRuta con su orden
            this.paradasRuta.push({
              ruta: this.selectedRuta,
              parada: respuesta, // Respuesta contiene la parada con el ID generado automáticamente
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


  console.log(this.paradasRuta)
  this.addEditParadaRuta();

  }

}



addEditParadaRuta() {

   // Iterar sobre la lista de paradasRuta
  this.paradasRuta.forEach(paradaRuta => {
    // Llamar al servicio para guardar la paradaRuta en la base de datos
    this.paradaRutaService.addParadaRuta(paradaRuta).subscribe(
      response => {
        // Manejar la respuesta si es necesario
        console.log('ParadaRuta guardada:', response);
            // Opcionalmente, puedes enviar un mensaje de éxito
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'ParadaRuta asignada correctamente.' });

      },
      error => {
        // Manejar errores si ocurren
        console.error('Error al guardar ParadaRuta:', error);

      }
    );
  });
  
 
}
}






