import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Ruta } from '../interface/ruta';
import { environment } from '../../environments/environment';
  



@Injectable({
  providedIn: 'root'
})
export class RutaService {


  constructor(
    private httpClient: HttpClient
  ) { }


  public obtenerRutas(): Observable<Ruta[]>{
    return this.httpClient.get<Ruta[]>(environment.urlApi+"rutas");
  }

  registrarRuta(postData: any, selectedPdt: any) {
    if (!selectedPdt) {
      return this.httpClient.post(`${environment.urlApi}rutas`, postData);
    } else {
      postData.id_ruta = selectedPdt.id_ruta;
      return this.httpClient.post(`${environment.urlApi}rutas`, postData);
    }
  }


  eliminarRuta(idRuta: number) {
    return this.httpClient.delete(`${environment.urlApi}rutas/${idRuta}`);
  }


  public obtenerRutaporId(idRuta: number): Observable<Ruta> {

    console.log(idRuta)
    return this.httpClient.get<Ruta>(`${environment.urlApi}rutas?idRuta=${idRuta}`);
  }


}
