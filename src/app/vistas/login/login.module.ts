import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeSelectModule } from 'primeng/treeselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CardModule } from 'primeng/card';
import { LoginComponent } from './login.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorInterceptorService } from '../../service/auth/error-interceptor.service';
import { JwtInterceptorService } from '../../service/auth/jwt-interceptor.service';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    CommonModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    FormsModule, 
    CardModule,
    TreeSelectModule,
    CommonModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    DropdownModule
  ],
  exports: [
    LoginComponent
  ],
  providers: [MessageService,ConfirmationService,
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptorService,multi:true},
  {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptorService,multi:true}
  ]

})
export class LoginModule { }
