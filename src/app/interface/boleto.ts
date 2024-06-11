import { Asiento } from "./asiento";
import { Viaje } from "./viaje";

export interface Boleto{
    idBoleto: number,
    numeroCedula: String,
    asiento: Asiento,
    viaje: Viaje
}
