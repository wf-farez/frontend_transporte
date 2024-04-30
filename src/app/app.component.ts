import { Component, OnInit } from '@angular/core';
import { Unidad } from './interface/unidad';
import { UnidadService } from './service/unidad.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
 
  // unidades: Unidad[] = [];
  // displayAddEditModal = false;
  // selectedUnidad: any = null;

  // constructor(private unidadService: UnidadService) { }

  // ngOnInit(): void {
  //   this.getUnidadList();
  // }

  // getUnidadList() {
  //   this.unidadService.getUnidades().subscribe(
  //     response => {
  //       this.unidades = response;
  //     }
  //   )
  // }

  // showAddModal() {
  //   this.displayAddEditModal = true;
  //   this.selectedUnidad = null;
  // }

  // hideAddModal(isClosed: boolean) {
  //   this.displayAddEditModal = !isClosed;
  // }

 
}
