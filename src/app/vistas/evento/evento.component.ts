

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Evento } from '../../interface/evento';
import { EventoService } from '../../service/evento.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {

  eventos: Evento[] = [];
  filteredEventos: Evento[] = [];
  searchTerm: string = '';

  displayAddEditModal = false;
  selectedEvento: any = null;
  selectedEstado: string = '';
  subscriptions: Subscription[] = [];
  pdtSubscription: Subscription = new Subscription();


  selectedFilter: string = 'tipoEvento';
  filterValue: string = '';

  constructor(
    private eventoService: EventoService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.obtenerEventosList();
    this.applyDefaultFilter();
  }

    // Aplicar filtro por defecto
    applyDefaultFilter() {
      this.filterBy({ target: { value: '' } });
    }
  

  obtenerEventosList() {
    this.eventoService.obtenerEventos().subscribe(
      response => {
        this.eventos = response;
        this.filteredEventos = [...this.eventos]; // Copia las eventos al array filtrado inicialmente
      }
    )
  }

  showAddModal() {
    this.displayAddEditModal = true;
    this.selectedEvento = null;
  }

  hideAddModal(isClosed: boolean) {
    this.displayAddEditModal = !isClosed;
  }
  // saveeventoToList

  saveEventoToList(newData: any) {
    this.eventos.unshift(newData);
    this.filteredEventos.unshift(newData); // Agrega la nueva evento también al array filtrado
  }

  saveorUpdateEventoList(newData: any) {
    const index = this.eventos.findIndex(data => data.idEvento === newData.idEvento);
    if (index !== -1) {
      this.eventos[index] = newData;
      this.filteredEventos = [...this.eventos]; // Actualiza el array filtrado con las eventos actualizadas
    } else {
      this.eventos.unshift(newData);
      this.filteredEventos.unshift(newData); // Agrega la nueva evento también al array filtrado
    }
  }

  showEditModal(evento: Evento) {
    this.displayAddEditModal = true;
    this.selectedEvento = evento;
  }

  

filterBy(event: any) {
const value = event?.target?.value;
if (value) {
  if (this.selectedFilter === 'descripcion') {
    this.eventos = this.eventos.filter(evento => evento.descripcion.toLowerCase().includes(value.toLowerCase()));
  } else if (this.selectedFilter === 'tipoEvento') {
    this.eventos = this.eventos.filter(evento => evento.tipoEvento.toLowerCase().includes(value.toLowerCase()));
  } else if (this.selectedFilter === 'fecha') {
    this.eventos = this.eventos.filter(evento => evento.fecha.toLowerCase().includes(value.toLowerCase()));
  
}else {
      // Si no se ha ingresado nada en el input, muestra todas las eventos nuevamente
      this.obtenerEventosList();
    }


}




}

}