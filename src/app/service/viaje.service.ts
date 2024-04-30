import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Viaje } from '../interface/viaje';
  



@Injectable({
  providedIn: 'root'
})
export class ViajeService {

  private API_SERVER = "http://localhost:8080/api/viajes";

  constructor(
    private httpClient: HttpClient
  ) { }


  public getViajes(): Observable<Viaje[]>{
    
    return this.httpClient.get<Viaje[]>(this.API_SERVER);
  }

  // saveviaje(postData: any) {
  //   return this.httpClient.post("http://localhost:8080/api/viajees", postData);
  // }

  addEditViaje(postData: any, selectedPdt: any) {
    if (!selectedPdt) {
      return this.httpClient.post('http://localhost:8080/api/viajes', postData);
    } else {

      //return this.httpClient.put(`http://localhost:8080/api/viajees/${selectedPdt.id_viaje}`, postData);

      postData.idViaje = selectedPdt.idViaje;
      return this.httpClient.put('http://localhost:8080/api/viajes', postData);
    }


    
  }


  deleteViaje(idViaje: number) {
    return this.httpClient.delete(`http://localhost:8080/api/viajes/${idViaje}`);
  }
}
