
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Comunicado } from '../../interface/comunicado';
import { ComunicadoService } from '../../service/comunicado.service';

@Component({
  selector: 'app-comunicado',
  templateUrl: './comunicado.component.html',
  styleUrls: ['./comunicado.component.css']
})
export class ComunicadoComponent implements OnInit, OnDestroy {

  comunicados: Comunicado[] = [];
  filteredComunicadoes: Comunicado[] = [];
  searchTerm: string = '';

  displayAddEditModal = false;
  selectedComunicado: any = null;
  subscriptions: Subscription[] = [];
  selectedFilter: string = 'descripcion';


  constructor(
    private comunicadoService: ComunicadoService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.obtenerComunicadosList();
    this.applyDefaultFilter();
  }
  // Aplicar filtro por defecto
   applyDefaultFilter(){
    this.filterBy({ target: { value: '' } });
  }

  obtenerComunicadosList() {
    this.comunicadoService.obtenerComunicados().subscribe(
      response => {
        this.comunicados = response;
        this.filteredComunicadoes = [...this.comunicados]; // Copia las Comunicados al array filtrado inicialmente
      }
    )
  }

  showAddModal() {
    this.displayAddEditModal = true;
    this.selectedComunicado = null;
  }

  hideAddModal(isClosed: boolean) {
    this.displayAddEditModal = !isClosed;
    this.obtenerComunicadosList();
  }
  // saveComunicadoToList

  saveComunicadoToList(newData: any) {
    this.comunicados.unshift(newData);
    this.filteredComunicadoes.unshift(newData); // Agrega la nueva Comunicado también al array filtrado
  }

  saveorUpdateComunicadoList(newData: any) {
    const index = this.comunicados.findIndex(data => data.idComunicado === newData.idComunicado);
    if (index !== -1) {
      this.comunicados[index] = newData;
      this.filteredComunicadoes = [...this.comunicados]; // Actualiza el array filtrado con las Comunicados actualizadas
    } else {
      this.comunicados.unshift(newData);
      this.filteredComunicadoes.unshift(newData); // Agrega la nueva Comunicado también al array filtrado
    }
    this.obtenerComunicadosList();
  }

  showEditModal(Comunicado: Comunicado) {
    this.displayAddEditModal = true;
    this.selectedComunicado = Comunicado;
  }

  eliminarComunicado(Comunicado: Comunicado) {
    this.confirmationService.confirm({
      message: 'Desea eliminar este Comunicado?',
      accept: () => {
        this.comunicadoService.eliminarComunicado(Comunicado.idComunicado).subscribe(
          response => {
            this.comunicados = this.comunicados.filter(data => data.idComunicado !== Comunicado.idComunicado);
            this.filteredComunicadoes = this.filteredComunicadoes.filter(data => data.idComunicado !== Comunicado.idComunicado);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Eliminado correctamente' });
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
  if (this.selectedFilter === 'descripcion') {
    this.comunicados = this.comunicados.filter(Comunicado => Comunicado.descripcion.toLowerCase().includes(value.toLowerCase()));
  } else if (this.selectedFilter === 'fecha') {
    this.comunicados = this.comunicados.filter(Comunicado => Comunicado.fecha.toLowerCase().includes(value.toLowerCase()));
  }
}else {
      // Si no se ha ingresado nada en el input, muestra todas las Comunicados nuevamente
      this.obtenerComunicadosList();
    }
}




}

