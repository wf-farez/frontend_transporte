import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../interface/evento';





@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private API_SERVER = "http://localhost:8080/api/eventos";

  constructor(
    private httpClient: HttpClient
  ) { }


  public getEventos(): Observable<Evento[]>{
    
    return this.httpClient.get<Evento[]>(this.API_SERVER);
  }


}
