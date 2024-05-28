import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Empleado } from '../../interface/empleado';
import { EmpleadoService } from '../../service/empleado.service';

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
  selectedFilter: string = 'cedula'; // Preselección del filtro
  filterValue: string = '';

  constructor(
    private empleadoService: EmpleadoService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.obtenerEmpleadosList();
    this.applyDefaultFilter(); // Aplicar filtro por defecto al iniciar
  }

  // Aplicar filtro por defecto
  applyDefaultFilter() {
    this.filterBy({ target: { value: '' } });
  }

  // Obtener la lista de empleados
  obtenerEmpleadosList() {
    this.empleadoService.obtenerEmpleados().subscribe(response => {
      this.empleados = response;
      this.filteredEmpleados = [...this.empleados]; // Copia los empleados al array filtrado inicialmente
    });
  }

  // Mostrar modal para agregar empleado
  showAddModal() {
    this.displayAddEditModal = true;
    this.selectedEmpleado = null;
  }

  // Ocultar modal
  hideAddModal(isClosed: boolean) {
    this.displayAddEditModal = !isClosed;
    this.obtenerEmpleadosList();
  }

  // Mostrar modal para editar empleado
  showEditModal(empleado: Empleado) {
    this.displayAddEditModal = true;
    this.selectedEmpleado = empleado;
  }

  // Guardar nuevo empleado en la lista
  saveEmpleadoToList(newData: any) {
    this.empleados.unshift(newData);
    this.filteredEmpleados.unshift(newData); // Agrega el nuevo empleado también al array filtrado
  }

  // Guardar o actualizar empleado en la lista
  saveorUpdateEmpleadoList(newData: any) {
    const index = this.empleados.findIndex(data => data.idEmpleado === newData.idEmpleado);
    if (index !== -1) {
      this.empleados[index] = newData;
      this.filteredEmpleados = [...this.empleados]; // Actualiza el array filtrado con los empleados actualizados
    } else {
      this.empleados.unshift(newData);
      this.filteredEmpleados.unshift(newData); // Agrega el nuevo empleado también al array filtrado
    }
    this.obtenerEmpleadosList();
  }

  // Eliminar empleado
  eliminarEmpleado(empleado: Empleado) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to eliminar this Empleado?',
      accept: () => {
        this.empleadoService.eliminarEmpleado(empleado.idEmpleado).subscribe(
          response => {
            this.empleados = this.empleados.filter(data => data.idEmpleado !== empleado.idEmpleado);
            this.filteredEmpleados = this.filteredEmpleados.filter(data => data.idEmpleado !== empleado.idEmpleado);
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'eliminado Successfully' });
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

  // Filtrar empleados según el filtro seleccionado
  filterBy(event: any) {
    const value = event?.target?.value;
    if (value) {
      if (this.selectedFilter === 'cedula') {
        this.filteredEmpleados = this.empleados.filter(empleado => empleado.cedula.toLowerCase().includes(value.toLowerCase()));
      } else if (this.selectedFilter === 'nombre') {
        this.filteredEmpleados = this.empleados.filter(empleado => empleado.nombre.toLowerCase().includes(value.toLowerCase()));
      } else if (this.selectedFilter === 'apellido') {
        this.filteredEmpleados = this.empleados.filter(empleado => empleado.apellido.toLowerCase().includes(value.toLowerCase()));
      } else if (this.selectedFilter === 'direccion') {
        this.filteredEmpleados = this.empleados.filter(empleado => empleado.direccion.toLowerCase().includes(value.toLowerCase()));
      } else if (this.selectedFilter === 'tipo') {
        this.filteredEmpleados = this.empleados.filter(empleado => empleado.tipo.toLowerCase().includes(value.toLowerCase()));
      } else if (this.selectedFilter === 'codigoAcceso') {
        this.filteredEmpleados = this.empleados.filter(empleado => empleado.codigoAcceso.toLowerCase().includes(value.toLowerCase()));
      }
    } else {
      // Si no se ha ingresado nada en el input, muestra todos los empleados nuevamente
      this.obtenerEmpleadosList();
    }
  }
}
