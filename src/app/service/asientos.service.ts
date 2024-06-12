import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Asiento } from '../interface/asiento';

  



@Injectable({
  providedIn: 'root'
})
export class AsientoService {


  constructor(
    private httpClient: HttpClient
  ) { }



 obtenerAsientosByUnidadId(idAsiento: number): Observable<Asiento[]> {
    const url= `${environment.urlApi}asientos?idAsiento=${idAsiento}`;
    console.log(url)
    return this.httpClient.get<Asiento[]>(url);
  }

    actualizarAsiento(postData: any) {
        return this.httpClient.post(`${environment.urlApi}asientos`, postData);
      }

}















// constructor(
//   private httpClient: HttpClient
// ) { }


// public obtenerParadas(): Observable<Parada[]>{
//   return this.httpClient.get<Parada[]>(environment.urlApi+"paradas");
// }

// //registrar paradas en parada
// registrarParada(postData: any, selectedPdt: any) {
//   if (!selectedPdt) {
//     return this.httpClient.post(environment.urlApi+"paradas", postData);
//   } else {
//     postData.idParada= selectedPdt.idParada;
//     return this.httpClient.put(environment.urlApi+"paradas", postData);
//   }
// }

// //registar parada en ruta
// agregarParada(postData: any) {
//   return this.httpClient.post(environment.urlApi+"paradas", postData);
// }


// eliminarParada(idParada: number) {
//   return this.httpClient.delete(`${environment.urlApi}paradas/${idParada}`);
// }



// @Injectable({
//   providedIn: 'root'
// })
// export class ParadaRutaService {

//   private API_SERVER = "http://localhost:8080/api/v1/paradasruta";

//   constructor(
//     private httpClient: HttpClient
//   ) { }


//   obtenerParadasRuta(): Observable<ParadaRuta[]>{
//     return this.httpClient.get<ParadaRuta[]>(environment.urlApi+"paradasruta");
//   }

//  obtenerParadasRutaByRutaId(idRuta: number): Observable<ParadaRuta[]> {
//     const url = `${this.API_SERVER}?idRuta=${idRuta}`;
//     console.log(url)
//     return this.httpClient.get<ParadaRuta[]>(url);
//   }

//   registrarParadaRuta(postData: any, selectedPdt: any) {
//     if (!selectedPdt) {
//       return this.httpClient.post('http://localhost:8080/api/v1/paradasruta', postData);
//     } else {
//       postData.idParadaRuta= selectedPdt.idParadaRuta;
//       return this.httpClient.put('http://localhost:8080/api/v1/paradasruta', postData);
//     }    
//   }

//   addParadaRuta(postData: any) {
//     return this.httpClient.post('http://localhost:8080/api/v1/paradasruta', postData);
      
//   }

//   eliminarParadaRuta(idParadaRuta: number) {
//     return this.httpClient.delete(`http://localhost:8080/api/v1/paradasruta/${idParadaRuta}`);
//   }

//   eliminarParadaRutaByRutaId(idRuta: number): Observable<any> {
//     return this.httpClient.delete(`http://localhost:8080/api/v1/paradasruta?idRuta=${idRuta}`);
//   }


// }