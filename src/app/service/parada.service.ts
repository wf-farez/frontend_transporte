import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Parada } from '../interface/parada';
import { environment } from '../../environments/environment';
  



@Injectable({
  providedIn: 'root'
})
export class ParadaService {


  constructor(
    private httpClient: HttpClient
  ) { }


  public obtenerParadas(): Observable<Parada[]>{
    return this.httpClient.get<Parada[]>(environment.urlApi+"paradas");
  }

  //registrar paradas en parada
  registrarParada(postData: any, selectedPdt: any) {
    if (!selectedPdt) {
      return this.httpClient.post(`${environment.urlApi}paradas`, postData);
    } else {
      postData.idParada= selectedPdt.idParada;
      return this.httpClient.post(`${environment.urlApi}paradas`, postData);
    }
  }

  //registar parada en ruta
  agregarParada(postData: any) {
    return this.httpClient.post(`${environment.urlApi}paradas`, postData);
  }

  eliminarParada(idParada: number) {
    return this.httpClient.delete(`${environment.urlApi}paradas/${idParada}`);
  }
}


