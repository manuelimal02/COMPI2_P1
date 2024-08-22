import { Entorno } from "../Entorno/Entorno.js";
import { BaseVisitor } from "../Visitor/Visitor.js";
import { DeclaracionVariableHandler } from "../Instruccion/Declaracion.js";

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
        console.log(node.op, node.izquierda, node.derecha);
        const izquierda = node.izquierda.accept(this);
        const derecha = node.derecha.accept(this);
        // Función auxiliar para determinar si un número es entero
        const esEntero = (num) => Number.isInteger(num);
        switch (node.op) {
            case '+':
            if (typeof izquierda === 'number' && typeof derecha === 'number') {
                // Suma de números
                const resultado = izquierda + derecha;
                return esEntero(izquierda) && esEntero(derecha) ? Math.floor(resultado) : resultado;
            } else if (typeof izquierda === 'string' && typeof derecha === 'string') {
                // Concatenación de strings
                return izquierda + derecha;
            } else {
                throw new Error(`Operación no válida: ${typeof izquierda} + ${typeof derecha}`);
            }
            case '-':
            if (typeof izquierda === 'number' && typeof derecha === 'number') {
                const resultado = izquierda - derecha;
                return esEntero(izquierda) && esEntero(derecha) ? Math.floor(resultado) : resultado;
            } else {
                throw new Error(`Operación no válida: ${typeof izquierda} - ${typeof derecha}`);
            }
            case '*':
            if (typeof izquierda === 'number' && typeof derecha === 'number') {
                const resultado = izquierda * derecha;
                return esEntero(izquierda) && esEntero(derecha) ? Math.floor(resultado) : resultado;
            } else {
                throw new Error(`Operación no válida: ${typeof izquierda} * ${typeof derecha}`);
            }
            case '/':
            if (typeof izquierda === 'number' && typeof derecha === 'number') {
                if (derecha === 0) {
                throw new Error('División por cero');
                }
                return izquierda / derecha; // Siempre devuelve un float
            } else {
                throw new Error(`Operación no válida: ${typeof izquierda} / ${typeof derecha}`);
            }
            case '%':
            if (esEntero(izquierda) && esEntero(derecha)) {
                if (derecha === 0) {
                throw new Error('Módulo por cero');
                }
                return izquierda % derecha;
            } else {
                throw new Error(`Operación de módulo solo válida para enteros: ${typeof izquierda} % ${typeof derecha}`);
            }
            default:
            throw new Error(`Operador no soportado: ${node.op}`);
        }
        
    }

    /**
    * @type {BaseVisitor['visitOperacionUnaria']}
    */
    visitOperacionUnaria(node) {
        const expresion = node.expresion.accept(this);
        switch (node.op) {
            case '-':
                return -expresion;
            default:
                throw new Error(`Operador Unario No Soportado: ${node.op}`);
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
        return node.valor;
    }

    /**
    * @type {BaseVisitor['visitDecimal']}
    */
    visitDecimal(node) {
        return node.valor;
    }

    /**
    * @type {BaseVisitor['visitCadena']}
    */
    visitCadena(node) {
        return node.valor;
    }

    /**
    * @type {BaseVisitor['visitCaracter']}
    */
    visitCaracter(node) {
        return node.valor;
    }

    /**
    * @type {BaseVisitor['visitBooleano']}
    */
    visitBooleano(node) {
        return node.valor;
    }

    /**
    * @type {BaseVisitor['visitDeclaracionVar']}
    */
    visitDeclaracionVar(node) {
        console.log(node.tipo, node.id, node.expresion);
        const DeclaracionHandler = new DeclaracionVariableHandler(node.tipo, node.id, node.expresion, this.entornoActual, this);
        DeclaracionHandler.EjecutarHandler();
        console.log(this.entornoActual);
    }

    /**
    * @type {BaseVisitor['visitReferenciaVariable']}
    */
    visitReferenciaVariable(node) {
        const NombreVar = node.id;
        return this.entornoActual.getVariable(NombreVar);
    }

    /**
    * @type {BaseVisitor['visitPrint']}
    */
    visitPrint(node) {
        const valor = node.expresion.accept(this);
        this.salida += valor + '\n';
    }

    /**
    * @type {BaseVisitor['visitExpresionStmt']}
    */
    visitExpresionStmt(node) {
        node.expresion.accept(this);
    }

    /**
    * @type {BaseVisitor['visitAsignacion']}
    */
    visitAsignacion(node) {
        const valor = node.asignacion.accept(this);
        this.entornoActual.assignVariable(node.id, valor);
        return valor;
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
    }

    /**
    * @type {BaseVisitor['visitWhile']}
    */
    visitWhile(node) {
    }
}