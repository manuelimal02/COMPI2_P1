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
        const EntornoAnteriorLlamada = interprete.entornoActual;
        interprete.entornoActual = entornoNuevo;
        try {
            this.node.bloque.accept(interprete);
        } catch (error) {
            interprete.entornoActual = EntornoAnteriorLlamada;
            if (error instanceof ReturnException) {
                if (this.node.tipo === 'void' && error.valor !== null) {
                    throw new Error(`Una Función: "${this.node.id}" De Tipo 'void' No puede Retornar Un Valor.`);
                }
                if(this.node.tipo === 'void' && error.valor === null){
                    return null;  
                }
                if (this.node.tipo !== error.valor.tipo) {
                    throw new Error(`El Tipo De Retorno: "${this.node.tipo}" No Coincide Con El Esperado: "${error.valor.tipo}".`);
                }
                return error.valor;
            }
            if (this.node.tipo !== 'void' && error instanceof BreakException) {
                throw new Error(`La Función ${this.node.id} Debe Retornar Un valor.`);
            }
            if (this.node.tipo !== 'void' && error instanceof ContinueException) {
                throw new Error(`La Función ${this.node.id} Debe Retornar Un Valor.`);
            }
            throw error;
        }
        interprete.entornoActual = EntornoAnteriorLlamada;
        return null;
    }
}