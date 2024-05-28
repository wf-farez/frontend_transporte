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
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importa FormsModule desde '@angular/forms'
import { CardModule } from 'primeng/card';
import { TreeSelectModule } from 'primeng/treeselect';

import { EmpleadoModule } from '../empleado/empleado.module';
import { UnidadModule } from '../unidad/unidad.module';
import { AddEditViajeModule } from './add-edit-viaje/add-edit-viaje.module';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [
    ViajeComponent

  ],
  imports: [
    CommonModule,
    HttpClientModule,
 
    ButtonModule,
    AddEditViajeModule,
 
    CardModule,
    TreeSelectModule, 
    EmpleadoModule,
    UnidadModule,
    DialogModule,
    TableModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    DropdownModule,
    CalendarModule,
    TableModule,
  
    ToastModule,
    ConfirmDialogModule,
  ], 
  exports: [
    ViajeComponent
  ],
  providers: [MessageService,ConfirmationService]


})
export class ViajeModule { }
