import { Entorno } from "../Entorno/Entorno.js";
import { BaseVisitor } from "../Visitor/Visitor.js";
import { DeclaracionVariableHandler } from "../Instruccion/Declaracion.js";
import { OperacionBinariaHandler } from "../Instruccion/OperacionBinaria.js";
import { TernarioHandler } from "../Instruccion/Ternario.js";
import { IfHandler } from "../Instruccion/SentenciaIF.js";
import { SwitchHandler } from "../Instruccion/Switch.js";
import { WhileHandler } from "../Instruccion/While.js";

export class Interprete extends BaseVisitor {

    constructor() {
        super();
        this.entornoActual = new Entorno();
        this.salida = '';
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
        const condicion = node.condicion.accept(this);
        if (condicion.tipo !== 'boolean') {
            throw new Error('Error: La Condición En Una Estructura While Debe Ser De Tipo Boolean.');
        }
        const whileHandler1 = new WhileHandler(node.condicion, node.sentencias, this);
        whileHandler1.EjecutarHandler();
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
        const entornoAnterior = this.entornoActual;
        this.entornoActual = new Entorno(entornoAnterior);
        node.declaracion.accept(this);
        let resultado = null;
        while (true) {
            const condicion = node.condicion.accept(this);
            if (condicion.tipo !== 'boolean') {
                throw new Error('Error: La Condición En Una Estructura For Debe Ser De Tipo Boolean.');
            }
            if (!condicion.valor) {
                break;
            }
            const resultadoBloque = node.sentencia.accept(this);
            if (resultadoBloque) {
                resultado = resultadoBloque.valor;
            }
            node.incremento.accept(this);
        }
        this.entornoActual = entornoAnterior;
        return { valor: resultado };
    }
}    