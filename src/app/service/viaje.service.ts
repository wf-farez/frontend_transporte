import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Viaje } from '../interface/viaje';
import { environment } from '../../environments/environment';
  



@Injectable({
  providedIn: 'root'
})
export class ViajeService {
  // private API_SERVER = "http://localhost:8080/api/v1/viajes";

  constructor(
    private httpClient: HttpClient
  ) { }

  public obtenerViajes(): Observable<Viaje[]>{
    // return this.httpClient.get<Viaje[]>(this.API_SERVER);
    return this.httpClient.get<Viaje[]>(`${environment.urlApi}viajes`);
  }

  registrarViaje(postData: any, selectedPdt: any) {
    if (!selectedPdt) {
      return this.httpClient.post(`${environment.urlApi}viajes`, postData);
      // return this.httpClient.post('http://localhost:8080/api/v1/viajes', postData);
    } else {
      postData.idViaje = selectedPdt.idViaje;
      // return this.httpClient.put('http://localhost:8080/api/v1/viajes', postData);
      return this.httpClient.post(`${environment.urlApi}viajes`, postData);
    }
  }

  eliminarViaje(idViaje: number) {
    //return this.httpClient.delete(`http://localhost:8080/api/v1/viajes/${idViaje}`);
    return this.httpClient.delete(`${environment.urlApi}viajes/${idViaje}`);
  }



}
