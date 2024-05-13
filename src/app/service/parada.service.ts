import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Parada } from '../interface/parada';
  



@Injectable({
  providedIn: 'root'
})
export class ParadaService {

  private API_SERVER = "http://localhost:8080/api/paradas";

  constructor(
    private httpClient: HttpClient
  ) { }


  public getParadas(): Observable<Parada[]>{
    
    return this.httpClient.get<Parada[]>(this.API_SERVER);
  }

  // saveUnidad(postData: any) {
  //   return this.httpClient.post("http://localhost:8080/api/unidades", postData);
  // }

  addEditParada(postData: any, selectedPdt: any) {
    if (!selectedPdt) {
      return this.httpClient.post('http://localhost:8080/api/paradas', postData);
    } else {

      //return this.httpClient.put(`http://localhost:8080/api/unidades/${selectedPdt.id_unidad}`, postData);

      postData.idParada= selectedPdt.idParada;
      return this.httpClient.put('http://localhost:8080/api/paradas', postData);
    }
  }


  addParada(postData: any) {
    return this.httpClient.post('http://localhost:8080/api/paradas', postData);
  }


  deleteParada(idParada: number) {
    return this.httpClient.delete(`http://localhost:8080/api/paradas/${idParada}`);
  }
}
