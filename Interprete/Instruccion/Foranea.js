import { Entorno } from "../Entorno/Entorno.js";
import { Invocable } from "./Invocable.js";
import { FuncionForanea } from "../Nodo/Nodos.js";
import { ReturnException, BreakException, ContinueException } from "./Transferencia.js";

export class Foranea extends Invocable {
    constructor(node, clousure){
        super();
        /**
         * @type {FuncionForanea}
         */
        this.node = node;

        /**
         * @type {Entorno}
         */
        this.clousure = clousure;
    }

    aridad() {
        return this.node.parametros.length;
    }

    /**
    * @type {Invocable['invocar']}
    */
    invocar(interprete, argumentos){
        const entornoNuevo = new Entorno(this.clousure);
        this.node.parametros.forEach((param, i) => {
            entornoNuevo.setVariable(param.tipo, param.id, argumentos[i]);
        });
        const entornoAntesDeLaLlamada = interprete.entornoActual;
        interprete.entornoActual = entornoNuevo;
        try {
            this.node.bloque.accept(interprete);
        } catch (error) {
            interprete.entornoActual = entornoAntesDeLaLlamada;
            if (error instanceof ReturnException) {
                // Verificar si la función es de tipo 'void' y si 'ReturnException' tiene un valor
                if (this.node.tipo === 'void' && error.valor !== null) {
                    throw new Error(`Una función de tipo 'void' no puede retornar un valor.`);
                }
                if(this.node.tipo === 'void' && error.valor === null){
                    return null;  
                }
                if (this.node.tipo !== error.valor.tipo) {
                    throw new Error(`El tipo de retorno no coincide con el esperado ${this.node.tipo} != ${error.valor.tipo}`);
                }
                return error.valor;
            }
            if (error instanceof BreakException) {
                return;
            }
            throw error;
        }
        interprete.entornoActual = entornoAntesDeLaLlamada;
        return null;
    }
}

