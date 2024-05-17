
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Parada } from '../interface/parada';
import { ParadaService } from '../service/parada.service';

@Component({
  selector: 'app-paradaruta',
  templateUrl: './paradaruta.component.html',
  styleUrls: ['./paradaruta.component.css']
})
export class ParadaRutaComponent implements OnInit, OnDestroy {

  paradas: Parada[] = [];
  filteredParadas: Parada[] = [];
  searchTerm: string = '';

  displayAddEditModal = false;
  selectedParada: any = null;
  selectedlongitud: string = '';
  subscriptions: Subscription[] = [];
  pdtSubscription: Subscription = new Subscription();

  selectedFilter: string = '';
  filterValue: string = '';

  constructor(
    private paradaService: ParadaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

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

  showAddModal() {
    this.displayAddEditModal = true;
    this.selectedParada = null;
  }

  hideAddModal(isClosed: boolean) {
    this.displayAddEditModal = !isClosed;
  }
  // saveparadaToList

  saveParadaToList(newData: any) {
    this.paradas.unshift(newData);
    this.filteredParadas.unshift(newData); // Agrega la nueva parada también al array filtrado
  }

  saveorUpdateParadaList(newData: any) {
    const index = this.paradas.findIndex(data => data.idParada === newData.idParada);
    if (index !== -1) {
      this.paradas[index] = newData;
      this.filteredParadas = [...this.paradas]; // Actualiza el array filtrado con las paradas actualizadas
    } else {
      this.paradas.unshift(newData);
      this.filteredParadas.unshift(newData); // Agrega la nueva parada también al array filtrado
    }
    this.getParadasList();
  }

  showEditModal(parada: Parada) {
    this.displayAddEditModal = true;
    this.selectedParada = parada;
  }

  deleteParada(parada: Parada) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this parada?',
      accept: () => {
        this.paradaService.deleteParada(parada.idParada).subscribe(
          response => {
            this.paradas = this.paradas.filter(data => data.idParada !== parada.idParada);
            this.filteredParadas = this.filteredParadas.filter(data => data.idParada !== parada.idParada);
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
  if (this.selectedFilter === 'nombreParada') {
    this.paradas = this.paradas.filter(parada => parada.nombreParada.toLowerCase().includes(value.toLowerCase()));
  } else if (this.selectedFilter === 'direccion') {
    this.paradas = this.paradas.filter(parada => parada.direccion.toLowerCase().includes(value.toLowerCase()));
  // } else if (this.selectedFilter === 'latitud') {
  //   const floatValue = parseFloat(value); // Convertir el valor a número entero
  //   this.paradas = this.paradas.filter(parada => parada.latitud.toString().includes(floatValue.toString()));
  // } else if (this.selectedFilter === 'longitud') {
  //   const floatValue = parseFloat(value);
  //   this.paradas = this.paradas.filter(parada => parada.longitud.toString().includes(floatValue.toString()));
  // 
}

}else {
      // Si no se ha ingresado nada en el input, muestra todas las paradas nuevamente
      this.getParadasList();
    }


}


}

