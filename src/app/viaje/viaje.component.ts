
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Viaje } from '../interface/viaje';
import { ViajeService } from '../service/viaje.service';

@Component({
  selector: 'app-viaje',
  templateUrl: './viaje.component.html',
  styleUrls: ['./viaje.component.css']
})
export class ViajeComponent implements OnInit, OnDestroy {

  viajes: Viaje[] = [];
  filteredViajes: Viaje[] = [];
  searchTerm: string = '';

  displayAddEditModal = false;
  selectedViaje: any = null;
  selectedEstado: string = '';
  subscriptions: Subscription[] = [];
  pdtSubscription: Subscription = new Subscription();


  selectedFilter: string = '';
  filterValue: string = '';

  constructor(
    private viajeService: ViajeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getViajesList();
  }

  getViajesList() {
    this.viajeService.getViajes().subscribe(
      response => {
        this.viajes = response;
        this.filteredViajes = [...this.viajes]; // Copia las Viajes al array filtrado inicialmente
      }
    )
  }

  showAddModal() {
    this.displayAddEditModal = true;
    this.selectedViaje = null;
  }

  hideAddModal(isClosed: boolean) {
    this.displayAddEditModal = !isClosed;
  }
  // saveViajeToList

  saveViajeToList(newData: any) {
    this.viajes.unshift(newData);
    this.filteredViajes.unshift(newData); // Agrega la nueva Viaje también al array filtrado
  }

  saveorUpdateViajeList(newData: any) {
    const index = this.viajes.findIndex(data => data.idViaje === newData.id_Viaje);
    if (index !== -1) {
      this.viajes[index] = newData;
      this.filteredViajes = [...this.viajes]; // Actualiza el array filtrado con las Viajes actualizadas
    } else {
      this.viajes.unshift(newData);
      this.filteredViajes.unshift(newData); // Agrega la nueva Viaje también al array filtrado
    }
    this.getViajesList();
  }

  showEditModal(viaje: Viaje) {
    this.displayAddEditModal = true;
    this.selectedViaje = viaje;
  }

  deleteViaje(viaje: Viaje) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this Viaje?',
      accept: () => {
        this.viajeService.deleteViaje(viaje.idViaje).subscribe(
          response => {
            this.viajes = this.viajes.filter(data => data.idViaje !== viaje.idViaje);
            this.filteredViajes = this.filteredViajes.filter(data => data.idViaje !== viaje.idViaje);
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
  if (this.selectedFilter === 'codigoViaje') {
    this.viajes = this.viajes.filter(viaje => viaje.codigoViaje.toLowerCase().includes(value.toLowerCase()));
  } else if (this.selectedFilter === 'fecha') {
    this.viajes = this.viajes.filter(Viaje => Viaje.fecha.toLowerCase().includes(value.toLowerCase()));
  } 
}else {
      // Si no se ha ingresado nada en el input, muestra todas las Viajes nuevamente
      this.getViajesList();
    }


}




}

