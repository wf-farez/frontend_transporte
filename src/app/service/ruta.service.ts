import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Ruta } from '../interface/ruta';
import { environment } from '../../environments/environment';
  



@Injectable({
  providedIn: 'root'
})
export class RutaService {

  //private API_SERVER = "http://localhost:8080/api/v1/rutas";

  constructor(
    private httpClient: HttpClient
  ) { }


  public obtenerRutas(): Observable<Ruta[]>{
    // return this.httpClient.get<Ruta[]>(this.API_SERVER);
    return this.httpClient.get<Ruta[]>(environment.urlApi+"rutas");
  }

  registrarRuta(postData: any, selectedPdt: any) {
    if (!selectedPdt) {
      //return this.httpClient.post('http://localhost:8080/api/v1/rutas', postData);
      return this.httpClient.post(`${environment.urlApi}rutas`, postData);
    } else {
      postData.id_ruta = selectedPdt.id_ruta;
      // return this.httpClient.put('http://localhost:8080/api/v1/rutas', postData);
      return this.httpClient.post(`${environment.urlApi}rutas`, postData);
    }
  }


  eliminarRuta(idRuta: number) {
    //return this.httpClient.delete(`http://localhost:8080/api/v1/rutas/${idRuta}`);
    return this.httpClient.delete(`${environment.urlApi}rutas/${idRuta}`);
  }

  // public obtenerRutaporId(idRuta: number): Observable<Ruta> {
  //   // const url = `${this.API_SERVER}?idRuta=${idRuta}`;
  //   console.log(idRuta)
  //   return this.httpClient.get<Ruta>(`http://localhost:8080/api/v1/rutas?idRuta=${idRuta}`);
  // }

  public obtenerRutaporId(idRuta: number): Observable<Ruta> {
    // const url = `${this.API_SERVER}?idRuta=${idRuta}`;
    console.log(idRuta)
    //return this.httpClient.get<Ruta>(`http://localhost:8080/api/v1/rutas?idRuta=${idRuta}`);
    return this.httpClient.get<Ruta>(`${environment.urlApi}rutas?idRuta=${idRuta}`);
    //const url = `${environment.urlApi}rutas?idRuta=${idRuta}`;
  }











}
