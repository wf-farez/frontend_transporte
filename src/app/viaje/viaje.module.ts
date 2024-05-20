import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViajeComponent } from './viaje.component';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from "@angular/common/http";
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { FormsModule } from '@angular/forms'; // Importa FormsModule desde '@angular/forms'
import { CardModule } from 'primeng/card';
import { TreeSelectModule } from 'primeng/treeselect';

import { EmpleadoModule } from '../empleado/empleado.module';
import { UnidadModule } from '../unidad/unidad.module';
import { AddEditViajeModule } from './add-edit-viaje/add-edit-viaje.module';

@NgModule({
  declarations: [
    ViajeComponent

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    AddEditViajeModule,
    ToastModule,
    ConfirmDialogModule,
    FormsModule, 
    CardModule,
    TreeSelectModule, 
    EmpleadoModule,
    UnidadModule

  ], 
  exports: [
    ViajeComponent
  ],
  providers: [MessageService,ConfirmationService]


})
export class ViajeModule { }
