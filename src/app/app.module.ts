import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UnidadModule } from './unidad/unidad.module';
import { ParadaModule } from './parada/parada.module';
import { RutaModule } from './ruta/ruta.module';
import { ViajeModule } from './viaje/viaje.module';
import { ComunicadoModule } from './comunicado/comunicado.module';
import { EmpleadoModule } from './empleado/empleado.module';
import { EventoModule } from './evento/evento.module';



@NgModule({
  declarations: [
    AppComponent,
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
    EventoModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
