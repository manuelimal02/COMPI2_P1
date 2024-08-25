import { Entorno } from "../Entorno/Entorno.js";
import { BaseVisitor } from "../Visitor/Visitor.js";
import { DeclaracionVariableHandler } from "../Instruccion/Declaracion.js";
import { OperacionBinariaHandler } from "../Instruccion/OperacionBinaria.js";
import { TernarioHandler } from "../Instruccion/Ternario.js";
import { IfHandler } from "../Instruccion/SentenciaIF.js";
import { Expresion } from "../Nodo/Nodos.js";
import { Embebidas } from "../Instruccion/Embebida.js";
import { Invocable } from "../Instruccion/Invocable.js";
import { BreakException, ContinueException, ReturnException } from "../Instruccion/Transferencia.js";
import Nodos from "../Nodo/Nodos.js";

export class Interprete extends BaseVisitor {

    constructor() {
        super();
        this.entornoActual = new Entorno();
        this.salida = '';

        Object.entries(Embebidas).forEach(([nombre, funcion]) => {
            this.entornoActual.setVariable('funcion', nombre, funcion);
        });
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
        const valores = node.expresion.map(expresion => expresion.accept(this).valor);
        this.salida += valores.join(' ') + '\n';
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
        const EntoronoInicial = this.entornoActual;
        let CasoEncontrado = false;
        try {
            for (const caso of node.cases) {
                if (!CasoEncontrado && caso.valor.accept(this).valor === node.condicion.accept(this).valor) {
                    CasoEncontrado = true;
                }
                if (CasoEncontrado) {
                    this.entornoActual = new Entorno(EntoronoInicial);
                    for (const SentenciasBloque of caso.bloquecase) {
                        try {
                            SentenciasBloque.accept(this);
                        } catch (error) {
                            if (error instanceof BreakException) {
                                return;
                            } else if (error instanceof ContinueException) {
                                break;
                            } else {
                                throw error;
                            }
                        }
                    }
                }
            }
            if (!CasoEncontrado && node.default1) {
                this.entornoActual = new Entorno(EntoronoInicial);
                for (const SentenciasBloque of node.default1.sentencias) {
                    try {
                        SentenciasBloque.accept(this);
                    } catch (error) {
                        if (error instanceof BreakException) {
                            return;
                        } else if (error instanceof ContinueException) {
                            break;
                        } else {
                            throw error;
                        }
                    }
                }
            }
        } finally {
        this.entornoActual = EntoronoInicial;
        }
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

    /**
     * @type {BaseVisitor['visitLlamada']}
     */
    visitLlamada(node) {
        const funcion = node.callee.accept(this);
        const argumentos = node.argumentos.map(arg => arg.accept(this));
        if (!(funcion instanceof Invocable)) {
            throw new Error(`La variable "${node.callee.id}" no es invocable`);
        }
        if (funcion.aridad() !== argumentos.length) {
            throw new Error(`La función espera ${funcion.aridad()} argumentos, pero se recibieron ${argumentos.length}`);
        }
        return funcion.invocar(this, argumentos);
    }
    /**
     * @type {BaseVisitor['visitEmbebida']}
     */ 
    visitEmbebida(node) {
        const expresion = node.Argumento.accept(this);
        const NombreFuncion = node.Nombre;
        switch (NombreFuncion) {
            case 'typeof':
                switch (expresion.tipo) {
                    case "int":
                        return {valor: expresion.tipo, tipo: "string" };
                    case "float":
                        return {valor: expresion.tipo, tipo: "string" };
                    case "string": 
                        return {valor: expresion.tipo, tipo: "string" };
                    case "char":
                        return {valor: expresion.tipo, tipo: "string" };
                    case "boolean": 
                        return {valor: expresion.tipo, tipo: "string" };    
                    default:
                        throw new Error(`El Argumento De typeof Es Tipo Desconocido: "${arg.tipo}".`);
                    }
            case 'toString':
                return {valor: expresion.valor.toString(), tipo: "string"};
        }
    }
}    