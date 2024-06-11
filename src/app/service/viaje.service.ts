import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Viaje } from '../interface/viaje';
import { environment } from '../../environments/environment';
  



@Injectable({
  providedIn: 'root'
})

export class ViajeService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public obtenerViajes(): Observable<Viaje[]>{
   
    return this.httpClient.get<Viaje[]>(`${environment.urlApi}viajes`);
  }

  registrarViaje(postData: any, selectedPdt: any) {
    if (!selectedPdt) {
      return this.httpClient.post(`${environment.urlApi}viajes`, postData);
    } else {
      postData.idViaje = selectedPdt.idViaje;
      return this.httpClient.post(`${environment.urlApi}viajes`, postData);
    }
  }

  eliminarViaje(idViaje: number) {
    return this.httpClient.delete(`${environment.urlApi}viajes/${idViaje}`);
  }

}
