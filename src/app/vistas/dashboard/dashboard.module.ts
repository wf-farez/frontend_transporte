import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { UnidadModule } from '../unidad/unidad.module';
import { AppRoutingModule } from '../../app-routing.module';
import { EmpleadoModule } from '../empleado/empleado.module';
import { ParadaModule } from '../parada/parada.module';
import { RutaModule } from '../ruta/ruta.module';
import { ViajeModule } from '../viaje/viaje.module';
import { ComunicadoModule } from '../comunicado/comunicado.module';
import { EventoModule } from '../evento/evento.module';
import { BodyComponent } from '../body/body.component';
import { DashboardComponent } from './dashboard.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { UnidadComponent } from '../unidad/unidad.component';
import { EmpleadoComponent } from '../empleado/empleado.component';
import { ParadaComponent } from '../parada/parada.component';
import { RutaComponent } from '../ruta/ruta.component';
import { ViajeComponent } from '../viaje/viaje.component';
import { ComunicadoComponent } from '../comunicado/comunicado.component';
import { EventoComponent } from '../evento/evento.component';
import { Routes } from '@angular/router';

// const routes: Routes = [

//   {path:'',redirectTo:'viajes',pathMatch:'full'},

//   //{path:'',redirectTo:'dashboard',pathMatch:'full'},
//   {path:'unidades',component:UnidadComponent},
//   {path:'empleados',component:EmpleadoComponent},
//   {path:'paradas',component:ParadaComponent},
//   {path:'rutas',component:RutaComponent},
//   {path:'viajes',component:ViajeComponent},
//   {path:'comunicados',component:ComunicadoComponent},
//   {path:'eventos',component:EventoComponent},
  
// ];

@NgModule({
  declarations: [
    DashboardComponent,
    SidenavComponent,
    BodyComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    UnidadModule,
    EmpleadoModule,
    ParadaModule,
    RutaModule,
    ViajeModule,
    ComunicadoModule,
    EventoModule,
    DashboardModule
  ]
})
export class DashboardModule { }
