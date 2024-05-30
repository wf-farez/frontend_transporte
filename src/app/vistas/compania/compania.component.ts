import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Compania } from '../../interface/compania';
import { CompaniaService } from '../../service/compania.service';

@Component({
  selector: 'app-compania',
  templateUrl: './compania.component.html',
  styleUrls: ['./compania.component.css']
})
export class CompaniaComponent implements OnInit, OnDestroy {

  companias: Compania[] = [];
  filteredCompanias: Compania[] = [];
  searchTerm: string = '';
  displayAddEditModal = false;
  selectedCompania: any = null;
  selectedEstado: string = '';
  subscriptions: Subscription[] = [];
  selectedFilter: string = 'nombreCompania'; // Preselección del filtro
  filterValue: string = '';

  constructor(
    private companiaService: CompaniaService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.obtenerCompaniasList();
    this.applyDefaultFilter(); // Aplicar filtro por defecto al iniciar
  }

  // Aplicar filtro por defecto
  applyDefaultFilter() {
    this.filterBy({ target: { value: '' } });
  }

  // Obtener la lista de companias
  obtenerCompaniasList() {
    this.companiaService.obtenerCompanias().subscribe(response => {
      this.companias = response;
      this.filteredCompanias = [...this.companias]; // Copia los companias al array filtrado inicialmente
    });
  }

  // Mostrar modal para agregar compania
  showAddModal() {
    this.displayAddEditModal = true;
    this.selectedCompania = null;
  }

  // Ocultar modal
  hideAddModal(isClosed: boolean) {
    this.displayAddEditModal = !isClosed;
    this.obtenerCompaniasList();
  }

  // Mostrar modal para editar compania
  showEditModal(compania: Compania) {
    this.displayAddEditModal = true;
    this.selectedCompania = compania;
  }

  // Guardar nuevo compania en la lista
  saveCompaniaToList(newData: any) {
    this.companias.unshift(newData);
    this.filteredCompanias.unshift(newData); // Agrega el nuevo compania también al array filtrado
  }

  // Guardar o actualizar compania en la lista
  saveorUpdateCompaniaList(newData: any) {
    const index = this.companias.findIndex(data => data.idCompania === newData.idCompania);
    if (index !== -1) {
      this.companias[index] = newData;
      this.filteredCompanias = [...this.companias]; // Actualiza el array filtrado con los companias actualizados
    } else {
      this.companias.unshift(newData);
      this.filteredCompanias.unshift(newData); // Agrega el nuevo compania también al array filtrado
    }
    this.obtenerCompaniasList();
  }

  // Eliminar compania
  eliminarCompania(compania: Compania) {
    this.confirmationService.confirm({
      message: 'Desea eliminar esta compania?',
      accept: () => {
        this.companiaService.eliminarCompania(compania.idCompania).subscribe(
          response => {
            this.companias = this.companias.filter(data => data.idCompania !== compania.idCompania);
            this.filteredCompanias = this.filteredCompanias.filter(data => data.idCompania !== compania.idCompania);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Eliminado correctamente' });
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

  // Filtrar companias según el filtro seleccionado
  filterBy(event: any) {
    const value = event?.target?.value;
    if (value) {
      if (this.selectedFilter === 'nombre') {
        this.filteredCompanias = this.companias.filter(compania => compania.nombreCompania.toLowerCase().includes(value.toLowerCase()));
      } else if (this.selectedFilter === 'direccion') {
        this.filteredCompanias = this.companias.filter(compania => compania.direccion.toLowerCase().includes(value.toLowerCase()));
      } 
    } else {
      // Si no se ha ingresado nada en el input, muestra todos los companias nuevamente
      this.obtenerCompaniasList();
    }
  }
}
