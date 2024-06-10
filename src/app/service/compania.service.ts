import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Compania } from '../interface/compania';

@Injectable({
  providedIn: 'root'
})
export class CompaniaService {
  constructor(
    private httpClient: HttpClient
  ) { }
obtenerCompanias(): Observable<Compania[]>{
    return this.httpClient.get<Compania[]>(environment.urlApi+"companias");
  }

registrarCompania(postData: any, selectedPdt: any) {
    if (!selectedPdt) {
      return this.httpClient.post(`${environment.urlApi}companias`, postData);
    } else {
      postData.idCompania = selectedPdt.idCompania;
      return this.httpClient.post(`${environment.urlApi}companias`, postData);
    }
  }
  
eliminarCompania(idCompania: number) {
    return this.httpClient.delete(`${environment.urlApi}companias/${idCompania}`);
  }
}
