import { Simcard } from "../simcard/simcard";

export class Operador {
    id_operador!: number;
    operador!: string;
    banda!: string;
    simcards: Simcard[] = [];
}