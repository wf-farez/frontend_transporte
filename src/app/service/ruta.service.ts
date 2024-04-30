import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Ruta } from '../interface/ruta';
  



@Injectable({
  providedIn: 'root'
})
export class RutaService {

  private API_SERVER = "http://localhost:8080/api/rutas";

  constructor(
    private httpClient: HttpClient
  ) { }


  public getRutas(): Observable<Ruta[]>{
    return this.httpClient.get<Ruta[]>(this.API_SERVER);
  }

  // saveruta(postData: any) {
  //   return this.httpClient.post("http://localhost:8080/api/rutas", postData);
  // }

  addEditRuta(postData: any, selectedPdt: any) {
    if (!selectedPdt) {
      return this.httpClient.post('http://localhost:8080/api/rutas', postData);
    } else {

      //return this.httpClient.put(`http://localhost:8080/api/rutas/${selectedPdt.id_ruta}`, postData);

      postData.id_ruta = selectedPdt.id_ruta;
      return this.httpClient.put('http://localhost:8080/api/rutas', postData);
    }


    
  }


  deleteRuta(idRuta: number) {
    return this.httpClient.delete(`http://localhost:8080/api/rutas/${idRuta}`);
  }
}
