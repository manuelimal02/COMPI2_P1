import { Entorno } from "../Entorno/Entorno.js";
import { BaseVisitor } from "../Visitor/Visitor.js";
import { DeclaracionVariableHandler } from "../Instruccion/Declaracion.js";
import { OperacionBinariaHandler } from "../Instruccion/OperacionBinaria.js";
import { OperacionUnariaHandler } from "../Instruccion/OperacionUnaria.js";
import { TernarioHandler } from "../Instruccion/Ternario.js";
import { IfHandler } from "../Instruccion/SentenciaIF.js";
import { Expresion } from "../Nodo/Nodos.js";
import { Embebidas } from "../Instruccion/Embebida.js";
import { Invocable } from "../Instruccion/Invocable.js";
import { BreakException, ContinueException, ReturnException } from "../Instruccion/Transferencia.js";
import Nodos from "../Nodo/Nodos.js";
import { Foranea } from "../Instruccion/Foranea.js";

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
        const handler = new OperacionUnariaHandler(node.operador, izquierda);
        return handler.EjecutarHandler();
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
        const valores = node.expresion.map(expresion => {
            const Matriz = expresion.accept(this);
            if (Array.isArray(Matriz)) {
                return Matriz;
            } else {
                return Matriz.valor;
            }
        });
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
            throw new Error(`La variable: "${node.callee.id}" no es invocable.`);
        }
        if (funcion.aridad() !== argumentos.length) {
            throw new Error(`La función: "${node.callee.id}" espera ${funcion.aridad()} argumentos, pero se recibieron ${argumentos.length}.`);
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

    /**
     * @type {BaseVisitor['visitDeclaracionArreglo1']}
     */ 
    visitDeclaracionArreglo1(node) {
        let arreglo = [];
        const valoresEvaluados = node.valores.map(valor => valor.accept(this));
        for (let valor of valoresEvaluados) {
            if (valor.tipo !== node.tipo) {
                throw new Error(`El Tipo Del Valor "${valor.valor}" No Coincide Con El Tipo Del Arreglo "${node.tipo}".`);
            }
            arreglo.push(valor.valor);
        }
        this.entornoActual.setVariable(node.tipo, node.id, arreglo);
    }

    /**
     * @type {BaseVisitor['visitDeclaracionArreglo2']}
     */ 
    visitDeclaracionArreglo2(node) {
        const numero = node.numero.accept(this);
        let arreglo = [];
        if (node.tipo1 !== node.tipo2) {
            throw new Error(`El Tipo Del Arreglo "${node.tipo1}" No Coincide Con El Tipo Del Arreglo "${node.tipo2}".`);
        }
        
        if (numero.tipo !== 'int') {
            throw new Error(`El Tamaño Del Arreglo Debe Ser De Tipo Int: "${numero.tipo}".`);
        }
        if (numero.valor < 0) {
            throw new Error(`El Tamaño Del Arreglo No Puede Ser Negativo: "${numero.valor}".`);
        }
        switch (node.tipo1) {
            case 'int':
                arreglo = Array(numero.valor).fill(0);
                break;
            case 'float':
                arreglo = Array(numero.valor).fill(0.0);
                break;
            case 'string':
                arreglo = Array(numero.valor).fill('');
                break;
            case 'char':
                arreglo = Array(numero.valor).fill('\0');
                break;
            case 'boolean':
                arreglo = Array(numero.valor).fill(false);
                break;
            default:
                throw new Error(`Tipo De Arreglo No Válido: "${node.tipo1}".`);
        }
        this.entornoActual.setVariable(node.tipo1, node.id, arreglo);
    }

    /**
     * @type {BaseVisitor['visitDeclaracionArreglo3']}
     */ 
    visitDeclaracionArreglo3(node) {
        const valores = this.entornoActual.getVariable(node.id2);
        if (!Array.isArray(valores.valor)) {
            throw new Error(`La Variable "${node.id2}" No Es Un Arreglo.`);
        }
        if (valores.tipo !== node.tipo) {
            throw new Error(`El Tipo Del Arreglo "${valores.tipo}" No Coincide Con El Tipo Del Arreglo "${node.tipo}".`);
        }
        this.entornoActual.setVariable(node.tipo, node.id1, valores.valor.slice());
    }

    /**
     * @type {BaseVisitor['visitIndexArreglo']}
     */
    visitIndexArreglo(node) {
        const arreglo = this.entornoActual.getVariable(node.id);
        const index = node.index.accept(this)
        if (!Array.isArray(arreglo.valor)) {
            throw new Error(`La Variable: "${node.id}" No Es Un Arreglo.`);
        }
        if (index.tipo!== arreglo.tipo){
            throw new Error(`El Tipo Del Indice "${index.tipo}" No Coincide Con El Tipo Del Arreglo "${arreglo.tipo}".`);
        }
        for (let i = 0; i < arreglo.valor.length; i++) {
            if (arreglo.valor[i] === index.valor) {
                return {valor: i, tipo: "int"};
            }
        }
        return {valor: -1, tipo:"int"};
    }

    /**
     * @type {BaseVisitor['visitIndexArreglo']}
     */
    visitJoinArreglo(node) {
        let cadena ="";
        const arreglo = this.entornoActual.getVariable(node.id);
        if (!Array.isArray(arreglo.valor)) {
            throw new Error(`La Variable: "${node.id}" No Es Un Arreglo.`);
        }
        for (let i = 0; i < arreglo.valor.length; i++) {
            cadena += arreglo.valor[i].toString();
            if (i < arreglo.valor.length - 1) {
                cadena += ",";
            }
        }
        return {valor: cadena, tipo: "string"};
    }

    /**
     * @type {BaseVisitor['visitLengthArreglo']}
     */
    visitLengthArreglo(node) {
        const arreglo = this.entornoActual.getVariable(node.id);
        if (!Array.isArray(arreglo.valor)) {
            throw new Error(`La Variable: "${node.id}" No Es Un Arreglo.`);
        }
        return {valor: arreglo.valor.length, tipo: "int"};
    }
    
    /**
     * @type {BaseVisitor['visitAccesoArreglo']}
     */
    visitAccesoArreglo(node) {
        const arreglo = this.entornoActual.getVariable(node.id);
        const index = node.index.accept(this)
        if (!Array.isArray(arreglo.valor)) {
            throw new Error(`La Variable: "${node.id}" No Es Un Arreglo.`);
        }
        if (index.tipo !== 'int') {
            throw new Error(`El Indice De Acceso Al Arreglo Debe Ser De Tipo Int: "${index.tipo}".`);
        }
        for (let i = 0; i < arreglo.valor.length; i++) {
            if (i === index.valor) {
                return {valor: arreglo.valor[i], tipo: arreglo.tipo};
            }
        }
        throw new Error(`Indice Fuera De Rango: "${index.valor}".`);
    }

    /**
     * @type {BaseVisitor['visitAsignacionArreglo']}
     */
    visitAsignacionArreglo(node) {
        const arreglo = this.entornoActual.getVariable(node.id);
        const index = node.index.accept(this);
        const valor = node.valor.accept(this);
        if (!Array.isArray(arreglo.valor)) {
            throw new Error(`La Variable: "${node.id}" No Es Un Arreglo.`);
        }
        if (index.tipo !== 'int') {
            throw new Error(`El Indice De Acceso Al Arreglo Debe Ser De Tipo Int: "${index.tipo}".`);
        }
        if (valor.tipo !== arreglo.tipo) {
            throw new Error(`El Tipo Del Valor "${valor.valor}" No Coincide Con El Tipo Del Arreglo "${arreglo.tipo}".`);
        }
        if (index.valor < 0 || index.valor >= arreglo.valor.length) {
            throw new Error(`Indice Fuera De Rango: "${index.valor}".`);
        }
        arreglo.valor[index.valor] = valor.valor;
        return;
    }

    /**
     * @type {BaseVisitor['visitDeclaracionMatriz1']}
     */
    visitDeclaracionMatriz1(node) {
        const RecorrerMatriz = (valores, tipo) => {
            const Matriz = [];
            for (let valor of valores) {
                if (Array.isArray(valor)) {
                    Matriz.push(RecorrerMatriz(valor, tipo));
                } else {
                    const ValorActual = valor.accept(this);
                    if (ValorActual.tipo !== tipo) {
                        throw new Error(`El Tipo Del Valor "${ValorActual.valor}" No Coincide Con El Tipo Del Arreglo "${tipo}".`);
                    }
                    Matriz.push(ValorActual.valor);
                }
            }
            return Matriz;
        };
        const NuevaMatriz = RecorrerMatriz(node.valores, node.tipo);
        this.entornoActual.setVariable(node.tipo, node.id, NuevaMatriz);
    }

    /**
     * @type {BaseVisitor['visitDeclaracionMatriz2']}
     */
    visitDeclaracionMatriz2(node) {
        if (node.tipo1 !== node.tipo2) {
            throw new Error(`El Tipo De La Matriz "${node.tipo1}" No Coincide Con El Tipo Del La Matriz "${node.tipo2}".`);
        }
        if (node.dimensiones.length !== node.valores.length) {       
            throw new Error(`Las Dimensiones De La Matriz "${node.dimensiones.length}" No Coinciden Con El Número De Valores "${node.valores.length}".`);
        }
        node.valores.forEach((valor, index) => {
            const numero = valor.accept(this);
            if (numero.tipo !== 'int') {
                throw new Error(`La Dimensión ${index + 1} Debe Ser De Tipo Int: "${numero.tipo}".`);
            }
            if (numero.valor < 0) {
                throw new Error(`La Dimensión ${index + 1} No Puede Ser Negativa: "${numero.valor}".`);
            }
        });
        function crearMatriz(Valores, tipo, ValorPorDefecto) {
            const DimensionActual = Valores[0];
            const SubDimension = Valores.slice(1);
            const Matriz = Array(DimensionActual.valor).fill(null);
            if (SubDimension.length > 0) {
                for (let i = 0; i < DimensionActual.valor; i++) {
                    Matriz[i] = crearMatriz(SubDimension, tipo, ValorPorDefecto);
                }
            } else {
                Matriz.fill(ValorPorDefecto);
            }
            return Matriz;
        }        
        let ValorPorDefecto;
        switch (node.tipo1) {
            case 'int':
                ValorPorDefecto = 0;
                break;
            case 'float':
                ValorPorDefecto = 0.0;
                break;
            case 'string':
                ValorPorDefecto = '';
                break;
            case 'char':
                ValorPorDefecto = '\0';
                break;
            case 'boolean':
                ValorPorDefecto = false;
                break;
            default:
                throw new Error(`Tipo De Matriz No Válido: "${node.tipo1}".`);
        }
        const NuevaMatriz = crearMatriz(node.valores, node.tipo1, ValorPorDefecto);
        this.entornoActual.setVariable(node.tipo1, node.id, NuevaMatriz);
        console.log(this.entornoActual);
    }

    /**
     * @type {BaseVisitor['visitAsignacionMatriz']}
     */
    visitAsignacionMatriz(node) {
        const matriz = this.entornoActual.getVariable(node.id);
        const nuevoValor = node.NuevoDato.accept(this);
        // Verificar si la variable es una matriz
        if (!Array.isArray(matriz.valor)) {
            throw new Error(`La Variable: "${node.id}" No Es Una Matriz.`);
        }
        // Verificar tipos y rangos de los índices
        let subMatriz = matriz.valor;
        node.indices.forEach((indice, index) => {
            const numero = indice.accept(this);
            if (numero.tipo !== 'int') {
                throw new Error(`El Índice De Acceso "${index + 1}" Debe Ser De Tipo Int: "${numero.tipo}".`);
            }
            if (numero.valor < 0 || numero.valor >= subMatriz.length) {
                throw new Error(`Índice Fuera De Rango: "${numero.valor}" En Dimensión "${index + 1}".`);
            }
            // Avanzar en la matriz multidimensional
            if (index < node.indices.length - 1) {
                subMatriz = subMatriz[numero.valor];
                if (!Array.isArray(subMatriz)) {
                    throw new Error(`La Variable En Dimensión "${index + 2}" No Es Una Matriz.`);
                }
            } else {
                // Último nivel, asignar el nuevo valor
                subMatriz[numero.valor] = nuevoValor.valor;
            }
        });
        // Verificar si el tipo del nuevo valor coincide con el tipo de la matriz
        if (nuevoValor.tipo !== matriz.tipo) {
            throw new Error(`El Tipo Del Valor "${nuevoValor.tipo}" No Coincide Con El Tipo De La Matriz "${matriz.tipo}".`);
        }
    }

    /**
     * @type {BaseVisitor['visitAccesoMatriz']}
     */
    visitAccesoMatriz(node) {
        const matriz = this.entornoActual.getVariable(node.id);
        
        if (!Array.isArray(matriz.valor)) {
            throw new Error(`La Variable: "${node.id}" No Es Una Matriz.`);
        }
        let ref = matriz.valor;
        node.valores.forEach((valor, index) => {
            const numero = valor.accept(this);
            if (numero.tipo !== 'int') {
                throw new Error(`El Indice De Acceso "${index + 1}" Debe Ser De Tipo Int: "${numero.tipo}".`);
            }
            if (numero.valor < 0) {
                throw new Error(`El Indice De Acceso "${index + 1}" No Puede Ser Negativa: "${numero.valor}".`);
            }
            if (numero.valor >= ref.length) {
                throw new Error(`Índice Fuera De Rango: "${numero.valor}" En Dimensión "${index + 1}".`);
            }
            ref = ref[numero.valor];
        });
        return { valor: ref, tipo: matriz.tipo };
    }

    /**
     * @type {BaseVisitor['visitForEach']}
     */
    visitForEach(node) {
        
    }

    /**
     * @type {BaseVisitor['visitFuncionForanea']}
     */
    visitFuncionForanea(node) {
        const nombre = node.parametros.map(param => param.id);
        const nombresUnicos = new Set(nombre);
        if (nombre.length !== nombresUnicos.size) {
            throw new Error(`Los parámetros de la función "${node.id}" no deben tener el mismo nombre.`);
        }
        const funcion = new Foranea(node, this.entornoActual);
        this.entornoActual.setVariable(node.tipo, node.id, funcion);
        console.log(this.entornoActual);
    }
}    