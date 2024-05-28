import { Compania } from "./compania";

export interface Ruta {
    idRuta: number,
    compania: Compania,
    nombreRuta: String,
    origenRuta: String,
    destinoRuta: String
}
