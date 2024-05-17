import { Parada } from "./parada";
import { Ruta } from "./ruta";

export interface ParadaRuta {
    idParadaRuta: number,
    ruta: Ruta,
    parada: Parada,
    orden: number
}
