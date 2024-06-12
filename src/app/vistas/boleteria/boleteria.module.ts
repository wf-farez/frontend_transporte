import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { BoleteriaComponent } from './boleteria.component';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
  declarations: [
    BoleteriaComponent

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TableModule,
    ButtonModule,

    ToastModule,
    ConfirmDialogModule,
    FormsModule, 
    CardModule,
    TreeSelectModule,
    ReactiveFormsModule,
    DialogModule,
    InputNumberModule,
    InputTextModule,
    DropdownModule

  ], 
  exports: [
    BoleteriaComponent
  ],
  providers: [MessageService,ConfirmationService]

})

export class BoleteriaModule { }
