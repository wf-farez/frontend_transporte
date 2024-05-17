import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParadaRutaComponent } from './paradaruta.component';
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

@NgModule({
  declarations: [
    ParadaRutaComponent

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
    TreeSelectModule

  ], 
  exports: [
    ParadaRutaComponent
  ],
  providers: [MessageService,ConfirmationService]


})
export class ParadaRutaModule { }