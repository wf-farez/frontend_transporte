
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Ruta } from '../../interface/ruta';
import { RutaService } from '../../service/ruta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.component.html',
  styleUrls: ['./ruta.component.css']
})
export class RutaComponent implements OnInit, OnDestroy {

  rutas: Ruta[] = [];
  filteredRutas: Ruta[] = [];
  searchTerm: string = '';
  //editar asignar
  displayAddEditModal = false;
  selectedRuta: any = null;
  subscriptions: Subscription[] = [];
  selectedFilter: string = 'nombreRuta';
//asignar paradas
  // displayAsignarModal=false;
  

  constructor(
    private rutaService: RutaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private router:Router) { }

  ngOnInit(): void {
    this.obtenerRutasList();
    this.applyDefaultFilter()
  }

     // Aplicar filtro por defecto
     applyDefaultFilter() {
      this.filterBy({ target: { value: '' } });
    }
  

  obtenerRutasList() {
    this.rutaService.obtenerRutas().subscribe(
      response => {
        this.rutas = response;
        this.filteredRutas = [...this.rutas]; // Copia las rutas al array filtrado inicialmente
      }
    )
  }

  showAddModal() {
    this.displayAddEditModal = true;
    this.selectedRuta = null;
  }
  showEditModal(ruta: Ruta) {
    this.displayAddEditModal = true;
    this.selectedRuta = ruta;
  }

  hideAddModal(isClosed: boolean) {
    this.displayAddEditModal = !isClosed;
    this.obtenerRutasList();
  }


  // saverutaToList
  saveRutaToList(newData: any) {
    this.rutas.unshift(newData);
    this.filteredRutas.unshift(newData); 
  }

  saveorUpdaterutaList(newData: any) {
    const index = this.rutas.findIndex(data => data.idRuta === newData.idRuta);
    if (index !== -1) {
      this.rutas[index] = newData;
      this.filteredRutas = [...this.rutas]; // Actualiza el array filtrado con las rutas actualizadas
    } else {
      this.rutas.unshift(newData);
      this.filteredRutas.unshift(newData); // Agrega la nueva ruta también al array filtrado
    }
    this.obtenerRutasList();
  }


  eliminarRuta(ruta: Ruta) {
    this.confirmationService.confirm({
      message: 'Desea eliminar esta ruta?',
      accept: () => {
        this.rutaService.eliminarRuta(ruta.idRuta).subscribe(
          response => {
            this.rutas = this.rutas.filter(data => data.idRuta !== ruta.idRuta);
            this.filteredRutas = this.filteredRutas.filter(data => data.idRuta !== ruta.idRuta);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Eliminacion correcta' });
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
          }
        )
      }
    });
  }

 
   
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

filterBy(event: any) {
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



// showEditParadasModal(ruta: Ruta) {
//   this.displayAsignarModal = true;
//   this.selectedRuta = ruta;
// }
// //Asignar rutas
// showAsignarModal(ruta: Ruta) {
//   this.displayAsignarModal = true;
//   this.selectedRuta = ruta;
// }

// hideAsignarModal(isClosed: boolean) {
//   this.displayAsignarModal = !isClosed;
// }


// llamarparadas(ruta: Ruta){
//   this.router.navigateByUrl('/dashboard/paradasderutas');
// }

llamarparadas(ruta: Ruta) {
  this.router.navigate(['/dashboard/paradasderutas', ruta.idRuta]);
}


}

