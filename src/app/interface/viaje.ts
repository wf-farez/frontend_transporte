import { Empleado } from "./empleado";
import { Ruta } from "./ruta";
import { Unidad } from "./unidad";

export interface Viaje {
    idViaje: number,
    codigoViaje: String,
    fecha: Date,
    horaInicio: Date,
    horaFin: Date,
    precioNormal: number,
    precioDiferenciado:number,
    conductor: Empleado,
    ayudante:Empleado,
    unidad: Unidad,
    ruta: Ruta,
    estado:boolean
}






