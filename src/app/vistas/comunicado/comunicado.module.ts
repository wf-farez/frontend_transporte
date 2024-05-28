import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { FormsModule } from '@angular/forms'; // Importa FormsModule desde '@angular/forms'
import { CardModule } from 'primeng/card';
import { TreeSelectModule } from 'primeng/treeselect';
import { AddEditComunicadoModule } from './add-edit-comunicado/add-edit-comunicado.module';
import { ComunicadoComponent } from './comunicado.component';
import { JwtInterceptorService } from '../../service/auth/jwt-interceptor.service';
import { ErrorInterceptorService } from '../../service/auth/error-interceptor.service';

@NgModule({
  declarations: [
    ComunicadoComponent

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    AddEditComunicadoModule,
    ToastModule,
    ConfirmDialogModule,
    FormsModule, 
    CardModule,
    TreeSelectModule

  ], 
  exports: [
    ComunicadoComponent
  ],
  providers: [MessageService,ConfirmationService,
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptorService,multi:true},
  {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptorService,multi:true}]


})
export class ComunicadoModule { }
