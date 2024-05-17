import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Empleado } from '../interface/empleado';
  



@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private API_SERVER = "http://localhost:8080/api/empleados";

  constructor(
    private httpClient: HttpClient
  ) { }


  public obtenerEmpleados(): Observable<Empleado[]>{
    
    return this.httpClient.get<Empleado[]>(this.API_SERVER);
  }
  registrarEmpleado(postData: any, selectedPdt: any) {
    if (!selectedPdt) {
      return this.httpClient.post('http://localhost:8080/api/empleados', postData);
    } else {
      postData.idEmpleado = selectedPdt.idEmpleado;
      return this.httpClient.put('http://localhost:8080/api/empleados', postData);
    }
  }
  eliminarEmpleado(idEmpleado: number) {
    return this.httpClient.delete(`http://localhost:8080/api/empleados/${idEmpleado}`);
  }
}
