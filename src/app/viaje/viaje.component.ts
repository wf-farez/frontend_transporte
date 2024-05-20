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
  selectedFilter: string = 'codigoViaje';
  filterValue: string = '';

  constructor(
    private viajeService: ViajeService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.obtenerViajesList();
    this.applyDefaultFilter();
  }

  // Aplicar filtro por defecto
  applyDefaultFilter() {
    this.filterBy({ target: { value: '' } });
  }

  // Obtener lista de viajes
  obtenerViajesList() {
    this.viajeService.obtenerViajes().subscribe(response => {
      this.viajes = response;
      this.filteredViajes = [...this.viajes]; // Copia los viajes al array filtrado inicialmente
    });
  }

  // Mostrar modal para agregar viaje
  showAddModal() {
    this.displayAddEditModal = true;
    this.selectedViaje = null;
  }

  // Ocultar modal de agregar/editar viaje
  hideAddModal(isClosed: boolean) {
    this.displayAddEditModal = !isClosed;
  }

  // Guardar nuevo viaje en la lista
  saveViajeToList(newData: any) {
    this.viajes.unshift(newData);
    this.filteredViajes.unshift(newData); // Agrega el nuevo viaje también al array filtrado
  }

  // Guardar o actualizar viaje en la lista
  saveorUpdateViajeList(newData: any) {
    const index = this.viajes.findIndex(data => data.idViaje === newData.id_Viaje);
    if (index !== -1) {
      this.viajes[index] = newData;
      this.filteredViajes = [...this.viajes]; // Actualiza el array filtrado con los viajes actualizados
    } else {
      this.viajes.unshift(newData);
      this.filteredViajes.unshift(newData); // Agrega el nuevo viaje también al array filtrado
    }
    this.obtenerViajesList();
  }

  // Mostrar modal para editar viaje
  showEditModal(viaje: Viaje) {
    this.displayAddEditModal = true;
    this.selectedViaje = viaje;
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

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // Filtrar viajes según el criterio seleccionado
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
      } else if (this.selectedFilter === 'estado') {
        // this.viajes = this.viajes.filter(viaje => viaje.estado.toLowerCase().includes(value));
      }
    } else {
      // Si no se ha ingresado nada en el input, muestra todas los viajes nuevamente
      this.obtenerViajesList();
    }
  }
}
