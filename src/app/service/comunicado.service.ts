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


  public getComunicados(): Observable<Comunicado[]>{
    
    return this.httpClient.get<Comunicado[]>(this.API_SERVER);
  }

  // saveUnidad(postData: any) {
  //   return this.httpClient.post("http://localhost:8080/api/unidades", postData);
  // }

  addEditComunicado(postData: any, selectedPdt: any) {
    if (!selectedPdt) {
      return this.httpClient.post('http://localhost:8080/api/comunicados', postData);
    } else {

      //return this.httpClient.put(`http://localhost:8080/api/unidades/${selectedPdt.id_unidad}`, postData);

      postData.idComunicado = selectedPdt.idComunicado;
      return this.httpClient.put('http://localhost:8080/api/comunicados', postData);
    }


    
  }


  deleteComunicado(idComunicado: number) {
    return this.httpClient.delete(`http://localhost:8080/api/comunicados/${idComunicado}`);
  }
}
