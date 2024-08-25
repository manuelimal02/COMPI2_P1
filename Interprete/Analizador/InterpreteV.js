import { Entorno } from "../Entorno/Entorno.js";
import { BaseVisitor } from "../Visitor/Visitor.js";
import { DeclaracionVariableHandler } from "../Instruccion/Declaracion.js";
import { OperacionBinariaHandler } from "../Instruccion/OperacionBinaria.js";
import { TernarioHandler } from "../Instruccion/Ternario.js";
import { IfHandler } from "../Instruccion/SentenciaIF.js";
import { SwitchHandler } from "../Instruccion/Switch.js";
import { Expresion } from "../Nodo/Nodos.js";
import { BreakException, ContinueException, ReturnException } from "../Instruccion/Transferencia.js";
import Nodos from "../Nodo/Nodos.js";

export class Interprete extends BaseVisitor {

    constructor() {
        super();
        this.entornoActual = new Entorno();
        this.salida = '';

        /**
         * @type {Expresion | null}
         */
        this.PrevContinue = null;
    }

    interpretar(nodo) {
        return nodo.accept(this);
    }
    /**
    * @type {BaseVisitor['visitOperacionBinaria']}
    */
    visitOperacionBinaria(node) {
        const izquierda = node.izquierda.accept(this);
        const derecha = node.derecha.accept(this);
        const handler = new OperacionBinariaHandler(node.operador, izquierda, derecha);
        return handler.EjecutarHandler();
    }

    /**
    * @type {BaseVisitor['visitOperacionUnaria']}
    */
    visitOperacionUnaria(node) {
        const izquierda = node.expresion.accept(this);
        switch (node.operador) {
            case '-':
                if (izquierda.tipo === 'int' || izquierda.tipo === 'float') {
                    return { valor: -izquierda.valor, tipo: izquierda.tipo };
                } else {
                    throw new Error(`Error: Operación - No Permitida El Tipo: "${expresion.tipo}".`);
                }

            case '++':
                if (izquierda.tipo === 'int') {
                    return { valor: izquierda.valor + 1, tipo: 'int' };
                } else if (izquierda.tipo === 'float') {
                    return { valor: izquierda.valor + 1, tipo: 'float' };
                } else {
                    throw new Error(`Error: Operación ++ No Permitida El Tipo: "${expresion.tipo}".`);
                }

            case '--':
                if (izquierda.tipo === 'int') {
                    return { valor: izquierda.valor - 1, tipo: 'int' };
                } else if (izquierda.tipo === 'float') {
                    return { valor: izquierda.valor - 1, tipo: 'float' };
                } else {
                    throw new Error(`Error: Operación -- No Permitida El Tipo: "${expresion.tipo}".`);
                }

            case '!':
                if (izquierda.tipo === 'boolean') {
                    return { valor: !izquierda.valor, tipo: 'boolean' };
                } else {
                    throw new Error(`Error: Operación ! No Permitida El Tipo: "${expresion.tipo}".`);
                }

            default:
                throw new Error(`Operador No Reconocido: ${this.operador}`);
        }

    }

    /**
    * @type {BaseVisitor['visitAgrupacion']}
    */
    visitAgrupacion(node) {
        return node.expresion.accept(this);
    }

    /**
    * @type {BaseVisitor['visitEntero']}
    */
    visitEntero(node) {
        return {valor: node.valor, tipo: node.tipo};
    }

    /**
    * @type {BaseVisitor['visitDecimal']}
    */
    visitDecimal(node) {
        return {valor: node.valor, tipo: node.tipo};
    }

    /**
    * @type {BaseVisitor['visitCadena']}
    */
    visitCadena(node) {
        return {valor: node.valor, tipo: node.tipo};
    }

    /**
    * @type {BaseVisitor['visitCaracter']}
    */
    visitCaracter(node) {
        return {valor: node.valor, tipo: node.tipo};
    }

    /**
    * @type {BaseVisitor['visitBooleano']}
    */
    visitBooleano(node) {
        return {valor: node.valor, tipo: node.tipo};
    }

    /**
    * @type {BaseVisitor['visitDeclaracionVar']}
    */
    visitDeclaracionVar(node) {
        const DeclaracionHandler = new DeclaracionVariableHandler(node.tipo, node.id, node.expresion, this.entornoActual, this);
        DeclaracionHandler.EjecutarHandler();
        console.log(this.entornoActual);
    }
    

    /**
    * @type {BaseVisitor['visitReferenciaVariable']}
    */
    visitReferenciaVariable(node) {
        const variable = this.entornoActual.getVariable(node.id);
        return variable.valor;
    }

    /**
    * @type {BaseVisitor['visitPrint']}
    */
    visitPrint(node) {
        const valor = node.expresion.accept(this).valor;
        this.salida += valor+ '\n';
    }

    /**
    * @type {BaseVisitor['visitTernario']}
    */
    visitTernario(node) {
        const TernarioHandler1 = new TernarioHandler(node.condicion, node.verdadero, node.falso, this);
        return TernarioHandler1.EjecutarHandler();
    }
    
    /**
    * @type {BaseVisitor['visitAsignacion']}
    */
    visitAsignacion(node) {
        const valor = node.asignacion.accept(this);
        this.entornoActual.assignVariable(node.id, valor);
        return  valor;
    }

    /**
    * @type {BaseVisitor['visitBloque']}
    */
    visitBloque(node) {
        const EntornoAnterior = this.entornoActual;
        this.entornoActual = new Entorno(EntornoAnterior);
        node.sentencias.forEach(sentencias => sentencias.accept(this));
        this.entornoActual = EntornoAnterior;
    }

    /**
    * @type {BaseVisitor['visitIf']}
    */
    visitIf(node) {
        const IfHandler1 = new IfHandler(node.condicion, node.sentenciasVerdadero, node.sentenciasFalso, this);
        IfHandler1.EjecutarHandler();
    }

    /**
    * @type {BaseVisitor['visitWhile']}
    */
    visitWhile(node) {
        const EntornoInicial = this.entornoActual;
        const condicion = node.condicion.accept(this);
        if (condicion.tipo !== 'boolean') {
            throw new Error('Error: La Condición En Una Estructura While Debe Ser De Tipo Boolean.');
        }
        try {
            while (node.condicion.accept(this).valor) {
                node.sentencias.accept(this);
            }
        } catch (error) {
            this.entornoActual = EntornoInicial;
            if (error instanceof BreakException) {
                return
            }
            if (error instanceof ContinueException) {
                return this.visitWhile(node);
            }
            throw error;
        }
    }
    /**
    * @type {BaseVisitor['visitSwitch']}
    */
    visitSwitch(node) {
        const switchHandler1 = new SwitchHandler(node.condicion, node.cases, node.default1, this);
        switchHandler1.EjecutarHandler();
        
    }

    /**
    * @type {BaseVisitor['visitFor']}
    */
    visitFor(node) {
        const PrevIncremento = this.PrevContinue;
        this.PrevContinue = node.incremento;
        const ImplementacionFor = new Nodos.Bloque({
            sentencias: [
                node.declaracion,
                new Nodos.While({
                    condicion: node.condicion,
                    sentencias: new Nodos.Bloque({
                        sentencias: [
                            node.sentencia,
                            node.incremento
                        ]
                    })
                })
            ]
        })
        ImplementacionFor.accept(this);
        this.PrevContinue = PrevIncremento;
        //const entornoAnterior = this.entornoActual;
        //this.entornoActual = new Entorno(entornoAnterior);
        //node.declaracion.accept(this);
        //let resultado = null;
        //while (true) {
        //    const condicion = node.condicion.accept(this);
        //    if (condicion.tipo !== 'boolean') {
        //        throw new Error('Error: La Condición En Una Estructura For Debe Ser De Tipo Boolean.');
        //    }
        //    if (!condicion.valor) {
        //        break;
        //    }
        //    const resultadoBloque = node.sentencia.accept(this);
        //    if (resultadoBloque) {
        //        resultado = resultadoBloque.valor;
        //    }
        //    node.incremento.accept(this);
        //}
        //this.entornoActual = entornoAnterior;
        //return { valor: resultado };
    }

    /**
    * @type {BaseVisitor['visitBreak']}
    */
    visitBreak(node) {
        throw new BreakException();
    }
    
    /**
    * @type {BaseVisitor['visitContinue']}
    */
    visitContinue(node) {
        if (this.PrevContinue) {
            this.PrevContinue.accept(this);
        }
        throw new ContinueException();
    }
    
    /**
    * @type {BaseVisitor['visitReturn']}
    */
    visitReturn(node) {
        let Valor = null;
        if(node.expresion){
            Valor = node.expresion.accept(this);
        }
        throw new ReturnException(Valor);
    }
}    