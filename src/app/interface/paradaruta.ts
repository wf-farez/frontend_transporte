import { Parada } from "./parada";
import { Ruta } from "./ruta";

export interface ParadaRuta {
    idParadaRuta: number,
    Ruta: Ruta,
    Parada: Parada,
    orden: number
}
