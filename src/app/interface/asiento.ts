import { Unidad } from "./unidad";

export interface Asiento {
    idAsiento: number,
    numeroAsiento: String,
    unidad: Unidad,
    estado: boolean
}
