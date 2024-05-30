import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { ParadasDeRutaComponent } from './paradasderuta.component';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    ParadasDeRutaComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    BrowserAnimationsModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    InputTextareaModule,
    DropdownModule,
    CardModule,
    TableModule,
    FormsModule,
    ToastModule
  ]
  , exports:[
    ParadasDeRutaComponent
  ],
  providers: [MessageService,ConfirmationService]

})

export class ParadasDeRutaModule { }
