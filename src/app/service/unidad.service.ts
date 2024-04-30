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


  public getUnidades(): Observable<Unidad[]>{
    
    return this.httpClient.get<Unidad[]>(this.API_SERVER);
  }

  // saveUnidad(postData: any) {
  //   return this.httpClient.post("http://localhost:8080/api/unidades", postData);
  // }

  addEditUnidad(postData: any, selectedPdt: any) {
    if (!selectedPdt) {
      return this.httpClient.post('http://localhost:8080/api/unidades', postData);
    } else {

      //return this.httpClient.put(`http://localhost:8080/api/unidades/${selectedPdt.id_unidad}`, postData);

      postData.idUnidad = selectedPdt.idUnidad;
      return this.httpClient.put('http://localhost:8080/api/unidades', postData);
    }


    
  }


  deleteUnidad(idUnidad: number) {
    return this.httpClient.delete(`http://localhost:8080/api/unidades/${idUnidad}`);
  }
}
