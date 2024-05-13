import { Empleado } from "./empleado";
import { Ruta } from "./ruta";
import { Unidad } from "./unidad";

export interface Viaje {
    idViaje: number,
    codigoViaje: String,
    fecha: String,
    horaInicio: String,
    horaFin: String,
    precioNormal: number,
    precioDiferenciado:number,
    conductor: Empleado,
    ayudante:Empleado,
    unidad: Unidad,
    ruta: Ruta
}






