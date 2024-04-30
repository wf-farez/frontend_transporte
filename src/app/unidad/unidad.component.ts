
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Unidad } from '../interface/unidad';
import { UnidadService } from '../service/unidad.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-unidad',
  templateUrl: './unidad.component.html',
  styleUrls: ['./unidad.component.css']
})
export class UnidadComponent implements OnInit, OnDestroy {

  unidades: Unidad[] = [];
  filteredUnidades: Unidad[] = [];
  searchTerm: string = '';

  displayAddEditModal = false;
  selectedUnidad: any = null;
  selectedEstado: string = '';
  subscriptions: Subscription[] = [];
  pdtSubscription: Subscription = new Subscription();


  selectedFilter: string = '';
  filterValue: string = '';

  constructor(
    private unidadService: UnidadService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getUnidadesList();
  }

  getUnidadesList() {
    this.unidadService.getUnidades().subscribe(
      response => {
        this.unidades = response;
        this.filteredUnidades = [...this.unidades]; // Copia las unidades al array filtrado inicialmente
      }
    )
  }

  showAddModal() {
    this.displayAddEditModal = true;
    this.selectedUnidad = null;
  }

  hideAddModal(isClosed: boolean) {
    this.displayAddEditModal = !isClosed;
  }

  saveUnidadToList(newData: any) {
    this.unidades.unshift(newData);
    this.filteredUnidades.unshift(newData); // Agrega la nueva unidad también al array filtrado
  }

  saveorUpdateUnidadList(newData: any) {
    const index = this.unidades.findIndex(data => data.idUnidad === newData.idUnidad);
    if (index !== -1) {
      this.unidades[index] = newData;
      this.filteredUnidades = [...this.unidades]; // Actualiza el array filtrado con las unidades actualizadas
    } else {
      this.unidades.unshift(newData);
      this.filteredUnidades.unshift(newData); // Agrega la nueva unidad también al array filtrado
    }

    this.getUnidadesList();
  }

  showEditModal(unidad: Unidad) {
    this.displayAddEditModal = true;
    this.selectedUnidad = unidad;
  }

  deleteUnidad(unidad: Unidad) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this unidad?',
      accept: () => {
        this.unidadService.deleteUnidad(unidad.idUnidad).subscribe(
          response => {
            this.unidades = this.unidades.filter(data => data.idUnidad !== unidad.idUnidad);
            this.filteredUnidades = this.filteredUnidades.filter(data => data.idUnidad !== unidad.idUnidad);
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
  if (this.selectedFilter === 'placa') {
    this.unidades = this.unidades.filter(unidad => unidad.placa.toLowerCase().includes(value.toLowerCase()));
  } else if (this.selectedFilter === 'codigo_unidad') {
    this.unidades = this.unidades.filter(unidad => unidad.codigoUnidad.toLowerCase().includes(value.toLowerCase()));
  } else if (this.selectedFilter === 'cantidad_asientos') {
    const intValue = parseInt(value, 10); // Convertir el valor a número entero
    this.unidades = this.unidades.filter(unidad => unidad.cantidadAsientos.toString().includes(intValue.toString()));
  } else if (this.selectedFilter === 'estado') {
    // Si 'estado' es booleano, no es necesario convertirlo a string
    this.unidades = this.unidades.filter(unidad => unidad.estado.toString().toLowerCase().includes(value.toLowerCase()));
  }
}else {
      // Si no se ha ingresado nada en el input, muestra todas las unidades nuevamente
      this.getUnidadesList();
    }


}




}

