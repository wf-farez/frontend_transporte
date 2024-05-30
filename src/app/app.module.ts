import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidenavComponent } from './vistas/sidenav/sidenav.component';
import { BodyComponent } from './vistas/body/body.component';

import { EmpleadoModule } from './vistas/empleado/empleado.module';
import { UnidadModule } from './vistas/unidad/unidad.module';
import { ParadaModule } from './vistas/parada/parada.module';
import { RutaModule } from './vistas/ruta/ruta.module';
import { ComunicadoModule } from './vistas/comunicado/comunicado.module';
import { EventoModule } from './vistas/evento/evento.module';
import { LoginModule } from './vistas/login/login.module';
import { LoginComponent } from './vistas/login/login.component';
import { DashboardComponent } from './vistas/dashboard/dashboard.component';
import { ViajeModule } from './vistas/viaje/viaje.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptorService } from './service/auth/jwt-interceptor.service';
import { ErrorInterceptorService } from './service/auth/error-interceptor.service';
import { ParadasDeRutaModule } from './vistas/ruta/paradasderuta/paradasderuta.module';
import { CompaniaComponent } from './vistas/compania/compania.component';
import { CompaniaModule } from './vistas/compania/compania.module';
import { RegisterModule } from './vistas/register/register.module';



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
    ParadasDeRutaModule,
    CompaniaModule,
    RegisterModule,

    
  ],
  providers: [provideClientHydration()  ,  
    {provide:HTTP_INTERCEPTORS,useClass:JwtInterceptorService,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptorService,multi:true}
  ],
  bootstrap: [AppComponent],
  

})
export class AppModule { }
