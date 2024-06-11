import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Unidad } from '../interface/unidad';
import { environment } from '../../environments/environment';
  
@Injectable({
  providedIn: 'root'
})
export class UnidadService {

  constructor(
    private httpClient: HttpClient
  ) { }

  public obtenerUnidades(): Observable<Unidad[]>{
    return this.httpClient.get<Unidad[]>(`${environment.urlApi}unidades`);
  }

  registrarUnidad(postData: any, selectedPdt: any): Observable<any> {
    if (!selectedPdt) {
      return this.httpClient.post<any>(`${environment.urlApi}unidades`, postData);
    } else {
      postData.idUnidad = selectedPdt.idUnidad;
      return this.httpClient.put<any>(`${environment.urlApi}unidades`, postData);
    }
  }
  eliminarUnidad(idUnidad: number) {
    return this.httpClient.delete(`${environment.urlApi}unidades/${idUnidad}`);
  }
  
  public registrarAsientos(postData: any) {
      return this.httpClient.post(environment.urlApi+"asientos", postData);
  }



  eliminarAsientoUnidadByUnidadId(idUnidad: number): Observable<any> {
    return this.httpClient.delete(`${environment.urlApi}asientos?idUnidad=${idUnidad}`);
  }


}
