import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Parada } from '../interface/parada';
import { ParadaRuta } from '../interface/paradaruta';
  



@Injectable({
  providedIn: 'root'
})
export class ParadaRutaService {

  private API_SERVER = "http://localhost:8080/api/paradasruta";

  constructor(
    private httpClient: HttpClient
  ) { }


  public getParadasRuta(): Observable<ParadaRuta[]>{
    return this.httpClient.get<ParadaRuta[]>(this.API_SERVER);
  }

  public getParadasRutaByRutaId(idRuta: number): Observable<ParadaRuta[]> {
    const url = `${this.API_SERVER}?idRuta=${idRuta}`;
    console.log(url)
    return this.httpClient.get<ParadaRuta[]>(url);
  }

  // saveUnidad(postData: any) {
  //   return this.httpClient.post("http://localhost:8080/api/unidades", postData);
  // }

  addEditParadaRuta(postData: any, selectedPdt: any) {
    if (!selectedPdt) {
      return this.httpClient.post('http://localhost:8080/api/paradasruta', postData);
    } else {
      //return this.httpClient.put(`http://localhost:8080/api/unidades/${selectedPdt.id_unidad}`, postData);
      postData.idParadaRuta= selectedPdt.idParadaRuta;
      return this.httpClient.put('http://localhost:8080/api/paradasruta', postData);
    }    
  }

  addParadaRuta(postData: any) {
    return this.httpClient.post('http://localhost:8080/api/paradasruta', postData);
      
  }



  deleteParadaRuta(idParadaRuta: number) {
    return this.httpClient.delete(`http://localhost:8080/api/paradasruta/${idParadaRuta}`);
  }


}
