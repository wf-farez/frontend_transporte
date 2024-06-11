import { Component, OnInit, OnDestroy } from '@angular/core';
import { Unidad } from '../../interface/unidad';
import { UnidadService } from '../../service/unidad.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

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
  subscriptions: Subscription[] = [];
  selectedFilter: string = 'placa'; // Preselección del filtro

  constructor(
    private unidadService: UnidadService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  // Se ejecuta al inicializar el componente
  ngOnInit(): void {
    this.obtenerUnidadesList();
    this.applyDefaultFilter(); // Aplicar filtro por defecto al iniciar
  }

   // Aplicar filtro por defecto
   applyDefaultFilter() {
    this.filterBy({ target: { value: '' } });
  }

  // Obtiene la lista de unidades desde el servicio
  obtenerUnidadesList() {
    this.unidadService.obtenerUnidades().subscribe(response => {
      this.unidades = response;
      this.filteredUnidades = [...this.unidades]; // Copia las unidades al array filtrado inicialmente
    });
  }

  // Muestra el modal para agregar una nueva unidad
  showAddModal() {
    this.displayAddEditModal = true;
    this.selectedUnidad = null;
  }

  // Oculta el modal de agregar/editar unidad
  hideAddModal(isClosed: boolean) {
    this.displayAddEditModal = !isClosed;
    this.obtenerUnidadesList();
  }

    // Muestra el modal para editar una unidad existente
  showEditModal(unidad: Unidad) {
    this.displayAddEditModal = true;
    this.selectedUnidad = unidad;
  }
  

  // Agrega una nueva unidad a la lista
  saveUnidadToList(newData: any) {
    this.unidades.unshift(newData);
    this.filteredUnidades.unshift(newData); // Agrega la nueva unidad también al array filtrado
  }

  // Guarda o actualiza una unidad en la lista
  saveorUpdateUnidadList(newData: any) {
    const index = this.unidades.findIndex(data => data.idUnidad === newData.idUnidad);
    if (index !== -1) {
      this.unidades[index] = newData;
      this.filteredUnidades = [...this.unidades]; // Actualiza el array filtrado con las unidades actualizadas
    } else {
      this.unidades.unshift(newData);
      this.filteredUnidades.unshift(newData); // Agrega la nueva unidad también al array filtrado
    }
    this.obtenerUnidadesList();
  }


  // Elimina una unidad después de confirmar la acción
  eliminarUnidad(unidad: Unidad) {
    const idUnidadEnviar=unidad.idUnidad;
    this.limpiarRegistrosDeAsientos(idUnidadEnviar);
    this.confirmationService.confirm({
      message: 'Desea eliminar esta unidad?',
      accept: () => {
        this.unidadService.eliminarUnidad(unidad.idUnidad).subscribe(
          response => {
            this.unidades = this.unidades.filter(data => data.idUnidad !== unidad.idUnidad);
            this.filteredUnidades = this.filteredUnidades.filter(data => data.idUnidad !== unidad.idUnidad);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Eliminado correctamente' });
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
          }
        );
      }
    });
  }

  // Se ejecuta al destruir el componente
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  // Filtra la lista de unidades según el criterio seleccionado
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
        this.unidades = this.unidades.filter(unidad => unidad.estado.toString().toLowerCase().includes(value.toLowerCase()));
      }
    } else {
      // Si no se ha ingresado nada en el input, muestra todas las unidades nuevamente
      this.obtenerUnidadesList();
    }
  }


  limpiarRegistrosDeAsientos(idUnidadEnviar: number) {
    console.log(idUnidadEnviar)
    return new Promise<void>((resolve, reject) => {
      // Llamar al servicio para eliminar registros de paradas de ruta por ID de ruta
      this.unidadService.eliminarAsientoUnidadByUnidadId(idUnidadEnviar).subscribe(
        () => {
          // Éxito al eliminar registros
          console.log('Registros de asientos de unidad eliminados correctamente.');
          resolve();
        },
        error => {
          // Error al eliminar registros
          console.error('Error al eliminar registros de asientos de unidad:', error);
          reject(error);
        }
      );
    });
  }
}
