import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RutaService } from '../../service/ruta.service';
import { ParadaService } from '../../service/parada.service';
import { Parada } from '../../interface/parada';
import { Subscription } from 'rxjs';

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

  paradaForm = this.fb.group({
    idParada: [""],
    nombreParada: ["", Validators.required],
    direccion: ["", Validators.required],
    latitud: ["", Validators.required],
    longitud: ["", Validators.required],
  });

  
paradasruta: {
  idRuta: any;
  nombreRuta: any;
  idParada: any;
  nombreParada: any;
  direccion: any;
  latitud: any;
  longitud: any;
}[] = [];



  constructor(private fb: FormBuilder, private rutaService: RutaService,
    private messageService: MessageService,  private paradaService: ParadaService,
    private confirmationService: ConfirmationService,
   ) { }
    
    paradas: Parada[] = [];
    filteredParadas: Parada[] = [];
    searchTerm: string = '';
  
    selectedParada: any = null;
    selectedlongitud: string = '';
    subscriptions: Subscription[] = [];
    pdtSubscription: Subscription = new Subscription();
  
    selectedFilter: string = '';
    filterValue: string = '';

  ngOnInit(): void {
    this.getParadasList();
  }

  getParadasList() {
    this.paradaService.getParadas().subscribe(
      response => {
        this.paradas = response;
        this.filteredParadas = [...this.paradas]; // Copia las paradas al array filtrado inicialmente
      }
    )
  }



closeModal() {
  this.rutaForm.reset();
    this.clickClose.emit(true);
    }


ngOnChanges(): void {
  if (this.selectedRuta) {
        this.modalType = 'Asignar';
        this.rutaForm.patchValue({
          idRuta: this.selectedRuta.idRuta,
          nombreCompania: this.selectedRuta.nombreCompania,
        });
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
      idRuta: 1, // Asigna el valor correcto para idRuta
      nombreRuta: this.selectedRuta?.nombreRuta, // Asigna el valor correcto para nombreRuta
      idParada: this.selectedParada.idParada, // Usa el id de la parada seleccionada
      nombreParada: this.selectedParada.nombreParada,
      direccion: this.selectedParada.direccion,
      latitud: this.selectedParada.latitud,
      longitud: this.selectedParada.longitud
    };

    // Agrega la nueva parada de ruta al arreglo de paradasruta
    this.paradasruta.push(nuevaParadaRuta);

    // Opcionalmente, puedes enviar un mensaje de éxito
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Parada asignada correctamente.' });

  } catch (error) {
    console.error('Error:', error);
  }
}

subirFila(index: number) {
  if (index > 0) {
    const filaActual = this.paradasruta[index];
    const filaAnterior = this.paradasruta[index - 1];
    this.paradasruta[index - 1] = filaActual;
    this.paradasruta[index] = filaAnterior;
  }
}

bajarFila(index: number) {
  if (index < this.paradasruta.length - 1) {
    const filaActual = this.paradasruta[index];
    const filaSiguiente = this.paradasruta[index + 1];
    this.paradasruta[index + 1] = filaActual;
    this.paradasruta[index] = filaSiguiente;
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
    longitud: longitud
  };

  this.paradasruta.push(nuevaParada);

  // Limpia el formulario después de agregar la parada
  this.paradaForm.reset();
}


eliminarParada(index: number): void {
  // Verifica que el índice esté dentro del rango de la lista de paradasruta
  if (index >= 0 && index < this.paradasruta.length) {
    // Elimina la fila en el índice especificado
    this.paradasruta.splice(index, 1);
    // Opcionalmente, puedes enviar un mensaje de éxito
    this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Parada eliminada correctamente.' });
  } else {
    console.error('Índice fuera de rango.');
  }
}


}