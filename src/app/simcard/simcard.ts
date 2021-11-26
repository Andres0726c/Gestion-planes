import { Operador } from "../operador/operador";

export class Simcard {
    id_simcard!: number;
    numero!: string;
    estado!: string;
    id_operador!: number;
    operador!: Operador;
}
