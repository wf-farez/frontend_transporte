import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnidadComponent } from './unidad/unidad.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { ParadaComponent } from './parada/parada.component';
import { RutaComponent } from './ruta/ruta.component';
import { ViajeComponent } from './viaje/viaje.component';
import { ComunicadoComponent } from './comunicado/comunicado.component';
import { EventoComponent } from './evento/evento.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'unidades', pathMatch: 'full' }, // Ruta inicial dentro del dashboard
      { path: 'unidades', component: UnidadComponent },
      { path: 'empleados', component: EmpleadoComponent },
      { path: 'paradas', component: ParadaComponent },
      { path: 'rutas', component: RutaComponent },
      { path: 'viajes', component: ViajeComponent },
      { path: 'comunicados', component: ComunicadoComponent },
      { path: 'eventos', component: EventoComponent }
     
    ]
  },
  { path: '**', redirectTo: 'login' } 
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
