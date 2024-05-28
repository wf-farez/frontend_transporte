import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Comunicado } from '../interface/comunicado';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComunicadoService {

  constructor(
    private httpClient: HttpClient,
  
  ) { }

  obtenerComunicados(): Observable<Comunicado[]>{
    return this.httpClient.get<Comunicado[]>(environment.urlApi+"comunicados")
  }

  registrarComunicado(postData: any, selectedPdt: any) {
    if (!selectedPdt) {
      return this.httpClient.post(environment.urlApi+"comunicados", postData);
    } else {
      postData.idComunicado = selectedPdt.idComunicado;
      return this.httpClient.put(environment.urlApi+"comunicados", postData);
    }
  }

  eliminarComunicado(idComunicado: number) {
    return this.httpClient.delete(`${environment.urlApi}comunicados/${idComunicado}`);
  }
}
