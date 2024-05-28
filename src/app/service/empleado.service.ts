import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Empleado } from '../interface/empleado';
import { environment } from '../../environments/environment';
  



@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(
    private httpClient: HttpClient
  ) { }


obtenerEmpleados(): Observable<Empleado[]>{
    
    return this.httpClient.get<Empleado[]>(environment.urlApi+"empleados");
  }

  registrarEmpleado(postData: any, selectedPdt: any) {
    
    if (!selectedPdt) {
      return this.httpClient.post(environment.urlApi+"empleados", postData);
    } else {
      postData.idEmpleado = selectedPdt.idEmpleado;
      return this.httpClient.put(environment.urlApi+"empleados", postData);
    }
  }

  eliminarEmpleado(idEmpleado: number) {
    return this.httpClient.delete(`${environment.urlApi}empleados/${idEmpleado}`);
  }

}
