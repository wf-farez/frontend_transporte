import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Ruta } from '../interface/ruta';
  



@Injectable({
  providedIn: 'root'
})
export class RutaService {

  private API_SERVER = "http://localhost:8080/api/v1/rutas";

  constructor(
    private httpClient: HttpClient
  ) { }


  public obtenerRutas(): Observable<Ruta[]>{
    return this.httpClient.get<Ruta[]>(this.API_SERVER);
  }

  registrarRuta(postData: any, selectedPdt: any) {
    if (!selectedPdt) {
      return this.httpClient.post('http://localhost:8080/api/v1/rutas', postData);
    } else {
      postData.id_ruta = selectedPdt.id_ruta;
      return this.httpClient.put('http://localhost:8080/api/v1/rutas', postData);
    }
  }


  eliminarRuta(idRuta: number) {
    return this.httpClient.delete(`http://localhost:8080/api/v1/rutas/${idRuta}`);
  }

  public obtenerRutaporId(idRuta: number): Observable<Ruta> {
    // const url = `${this.API_SERVER}?idRuta=${idRuta}`;
    console.log(idRuta)
    return this.httpClient.get<Ruta>(`http://localhost:8080/api/v1/rutas?idRuta=${idRuta}`);
  }


}
