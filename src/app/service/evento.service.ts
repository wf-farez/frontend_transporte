import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evento } from '../interface/evento';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  constructor(
    private httpClient: HttpClient
  ) { }
  public obtenerEventos(): Observable<Evento[]>{
    return this.httpClient.get<Evento[]>(environment.urlApi+"eventos");
  }
}
