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


  public obtenerParadas(): Observable<Parada[]>{
    return this.httpClient.get<Parada[]>(this.API_SERVER);
  }

  //registrar paradas en parada
  registrarParada(postData: any, selectedPdt: any) {
    if (!selectedPdt) {
      return this.httpClient.post('http://localhost:8080/api/paradas', postData);
    } else {
      postData.idParada= selectedPdt.idParada;
      return this.httpClient.put('http://localhost:8080/api/paradas', postData);
    }
  }

  //registar parada en ruta
  agregarParada(postData: any) {
    return this.httpClient.post('http://localhost:8080/api/paradas', postData);
  }


  eliminarParada(idParada: number) {
    return this.httpClient.delete(`http://localhost:8080/api/paradas/${idParada}`);
  }
}
