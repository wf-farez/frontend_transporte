import { Empleado } from "./empleado";

export interface Viaje {
    idViaje: number,
    codigoViaje: String,
    fecha: String,
    horaInicio: String,
    horaFin: String,
    precioNormal: number,
    precioDiferenciado:number,
    idConductor: number,
    idAyudante:number
}
