import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comunicado } from '../interface/comunicado';

@Injectable({
  providedIn: 'root'
})
export class ComunicadoService {

  private API_SERVER = "http://localhost:8080/api/comunicados";

  constructor(
    private httpClient: HttpClient
  ) { }


  public obtenerComunicados(): Observable<Comunicado[]>{
    return this.httpClient.get<Comunicado[]>(this.API_SERVER);
  }


  registrarComunicado(postData: any, selectedPdt: any) {
    if (!selectedPdt) {
      return this.httpClient.post('http://localhost:8080/api/comunicados', postData);
    } else {

      postData.idComunicado = selectedPdt.idComunicado;
      return this.httpClient.put('http://localhost:8080/api/comunicados', postData);
    }


    
  }

  eliminarComunicado(idComunicado: number) {
    return this.httpClient.delete(`http://localhost:8080/api/comunicados/${idComunicado}`);
  }
}
