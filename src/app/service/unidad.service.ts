import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Unidad } from '../interface/unidad';
  



@Injectable({
  providedIn: 'root'
})
export class UnidadService {

  private API_SERVER = "http://localhost:8080/api/unidades";

  constructor(
    private httpClient: HttpClient
  ) { }

  public obtenerUnidades(): Observable<Unidad[]>{
    return this.httpClient.get<Unidad[]>(this.API_SERVER);
  }

  registrarUnidad(postData: any, selectedPdt: any) {
    if (!selectedPdt) {
      return this.httpClient.post('http://localhost:8080/api/unidades', postData);
    } else {
      postData.idUnidad = selectedPdt.idUnidad;
      return this.httpClient.put('http://localhost:8080/api/unidades', postData);
    }
  }

  eliminarUnidad(idUnidad: number) {
    return this.httpClient.delete(`http://localhost:8080/api/unidades/${idUnidad}`);
  }
  
}
