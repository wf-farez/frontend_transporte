import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnidadComponent } from './vistas/unidad/unidad.component';
import { EmpleadoComponent } from './vistas/empleado/empleado.component';
import { ParadaComponent } from './vistas/parada/parada.component';
import { RutaComponent } from './vistas/ruta/ruta.component';
import { ViajeComponent } from './vistas/viaje/viaje.component';
import { ComunicadoComponent } from './vistas/comunicado/comunicado.component';
import { EventoComponent } from './vistas/evento/evento.component';
import { DashboardComponent } from './vistas/dashboard/dashboard.component';
import { LoginComponent } from './vistas/login/login.component';
import { ParadasDeRutaComponent } from './vistas/ruta/paradasderuta/paradasderuta.component';
import { CompaniaComponent } from './vistas/compania/compania.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'viajes', pathMatch: 'full' }, // Ruta inicial dentro del dashboard
      { path: 'unidades', component: UnidadComponent },
      { path: 'empleados', component: EmpleadoComponent },
      { path: 'paradas', component: ParadaComponent },
      { path: 'rutas', component: RutaComponent },
      { path: 'viajes', component: ViajeComponent },
      { path: 'comunicados', component: ComunicadoComponent },
      { path: 'eventos', component: EventoComponent },
      { path: 'paradasderutas', component: ParadasDeRutaComponent},
      { path: 'paradasderutas/:idRuta', component: ParadasDeRutaComponent },
      { path: 'companias', component: CompaniaComponent },

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
