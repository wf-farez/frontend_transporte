import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { BodyComponent } from './body/body.component';

import { EmpleadoModule } from './empleado/empleado.module';
import { UnidadModule } from './unidad/unidad.module';
import { ParadaModule } from './parada/parada.module';
import { RutaModule } from './ruta/ruta.module';
import { ComunicadoModule } from './comunicado/comunicado.module';
import { EventoModule } from './evento/evento.module';
import { LoginModule } from './login/login.module';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViajeModule } from './viaje/viaje.module';



@NgModule({

  declarations: [
    AppComponent,
    SidenavComponent,
    BodyComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UnidadModule,
    EmpleadoModule,
    ParadaModule,
    RutaModule,
    ViajeModule,
    ComunicadoModule,
    EventoModule,
    
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent]
})
export class AppModule { }
