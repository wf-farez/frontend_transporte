
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Ruta } from '../interface/ruta';
import { RutaService } from '../service/ruta.service';

@Component({
  selector: 'app-ruta',
  templateUrl: './ruta.component.html',
  styleUrls: ['./ruta.component.css']
})
export class RutaComponent implements OnInit, OnDestroy {

  rutas: Ruta[] = [];
  filteredRutas: Ruta[] = [];
  searchTerm: string = '';

  displayAddEditModal = false;

  selectedRuta: any = null;
  selectedEstado: string = '';
  subscriptions: Subscription[] = [];
  pdtSubscription: Subscription = new Subscription();

  selectedFilter: string = '';
  filterValue: string = '';

//asignar paradas
  displayAsignarModal=false;
  

  constructor(
    private rutaService: RutaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getRutasList();
  }

  getRutasList() {
    this.rutaService.getRutas().subscribe(
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
  }

  // saverutaToList

  saveRutaToList(newData: any) {
    this.rutas.unshift(newData);
    this.filteredRutas.unshift(newData); // Agrega la nueva ruta también al array filtrado
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
    this.getRutasList();
  }


  deleteruta(ruta: Ruta) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this ruta?',
      accept: () => {
        this.rutaService.deleteRuta(ruta.idRuta).subscribe(
          response => {
            this.rutas = this.rutas.filter(data => data.idRuta !== ruta.idRuta);
            this.filteredRutas = this.filteredRutas.filter(data => data.idRuta !== ruta.idRuta);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully' });
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



//Asignar rutas
showAsignarModal(ruta: Ruta) {
  this.displayAsignarModal = true;
  this.selectedRuta = ruta;
}

hideAsignarModal(isClosed: boolean) {
  this.displayAsignarModal = !isClosed;
}


saveorUpdaterutaList2(newData: any) {
  console.log("salida")
}






}

