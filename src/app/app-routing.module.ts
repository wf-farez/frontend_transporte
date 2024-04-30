import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnidadComponent } from './unidad/unidad.component';
import { EmpleadoComponent } from './empleado/empleado.component';
import { ParadaComponent } from './parada/parada.component';
import { RutaComponent } from './ruta/ruta.component';
import { ViajeComponent } from './viaje/viaje.component';
import { ComunicadoComponent } from './comunicado/comunicado.component';
import { EventoComponent } from './evento/evento.component';


const routes: Routes = [
  //{path:'',redirectTo:'dashboard',pathMatch:'full'},
  {path:'unidades',component:UnidadComponent},
  {path:'empleados',component:EmpleadoComponent},
  {path:'paradas',component:ParadaComponent},
  {path:'rutas',component:RutaComponent},
  {path:'viajes',component:ViajeComponent},
  {path:'comunicados',component:ComunicadoComponent},
  {path:'eventos',component:EventoComponent},
  
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
