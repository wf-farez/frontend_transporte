
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Empleado } from '../interface/empleado';
import { EmpleadoService } from '../service/empleado.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit, OnDestroy {

  empleados: Empleado[] = [];
  filteredEmpleados: Empleado[] = [];
  searchTerm: string = '';

  displayAddEditModal = false;
  selectedEmpleado: any = null;
  selectedEstado: string = '';
  subscriptions: Subscription[] = [];


  selectedFilter: string = '';
  filterValue: string = '';

  constructor(
    private empleadoService: EmpleadoService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.obtenerEmpleadosList();
  }

  obtenerEmpleadosList() {
    this.empleadoService.obtenerEmpleados().subscribe(
      response => {
        this.empleados = response;
        this.filteredEmpleados
     = [...this.empleados]; // Copia las empleados al array filtrado inicialmente
      }
    )
  }

  showAddModal() {
    this.displayAddEditModal = true;
    this.selectedEmpleado = null;
  }

  hideAddModal(isClosed: boolean) {
    this.displayAddEditModal = !isClosed;
  }
  // saveEmpleadoToList

  saveEmpleadoToList(newData: any) {
    this.empleados.unshift(newData);
    this.filteredEmpleados
.unshift(newData); // Agrega la nueva Empleado también al array filtrado
  }

  saveorUpdateEmpleadoList(newData: any) {
    const index = this.empleados.findIndex(data => data.idEmpleado === newData.idEmpleado);
    if (index !== -1) {
      this.empleados[index] = newData;
      this.filteredEmpleados
   = [...this.empleados]; // Actualiza el array filtrado con las empleados actualizadas
    } else {
      this.empleados.unshift(newData);
      this.filteredEmpleados
  .unshift(newData); // Agrega la nueva Empleado también al array filtrado
    }

    this.obtenerEmpleadosList();
  }

  showEditModal(Empleado: Empleado) {
    this.displayAddEditModal = true;
    this.selectedEmpleado = Empleado;
  }

  eliminarEmpleado(Empleado: Empleado) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to eliminar this Empleado?',
      accept: () => {
        this.empleadoService.eliminarEmpleado(Empleado.idEmpleado).subscribe(
          response => {
            this.empleados = this.empleados.filter(data => data.idEmpleado !== Empleado.idEmpleado);
            this.filteredEmpleados
         = this.filteredEmpleados
        .filter(data => data.idEmpleado !== Empleado.idEmpleado);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'eliminard Successfully' });
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
const value = event?.tarobtener?.value;
if (value) {
  if (this.selectedFilter === 'cedula') {
    this.empleados = this.empleados.filter(Empleado => Empleado.cedula.toLowerCase().includes(value.toLowerCase()));
  } else if (this.selectedFilter === 'nombre') {
    this.empleados = this.empleados.filter(Empleado => Empleado.nombre.toLowerCase().includes(value.toLowerCase()));
  } else if (this.selectedFilter === 'apellido') {
    this.empleados = this.empleados.filter(Empleado => Empleado.apellido.toLowerCase().includes(value.toLowerCase()));
  } else if (this.selectedFilter === 'direccion') {
    this.empleados = this.empleados.filter(Empleado => Empleado.direccion.toLowerCase().includes(value.toLowerCase()));
  } else if (this.selectedFilter === 'tipo') {
    this.empleados = this.empleados.filter(Empleado => Empleado.tipo.toLowerCase().includes(value.toLowerCase()));
  } else if (this.selectedFilter === 'codigoAcceso') {
    this.empleados = this.empleados.filter(Empleado => Empleado.codigoAcceso.toLowerCase().includes(value.toLowerCase()));
  }
}else {
      // Si no se ha ingresado nada en el input, muestra todas las empleados nuevamente
      this.obtenerEmpleadosList();
    }


}
}

