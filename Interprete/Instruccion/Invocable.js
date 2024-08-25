import { Interprete } from "../Analizador/InterpreteV.js";

export class Invocable {

    aridad() {
        throw new Error('No Implementado');
    }

    /**
     * @param interprete {Interprete}
     * @param args {any[]}
     */
    invocar(interprete, args) {
        throw new Error('No Implementado');
    }

}