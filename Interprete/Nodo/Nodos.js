
/**
    * @typedef {Object} Location
    * @property {Object} start
    * @property {number} start.offset
    * @property {number} start.line
    * @property {number} start.column
    * @property {Object} end
    * @property {number} end.offset
    * @property {number} end.line
    * @property {number} end.column
*/
    

/**
 * @typedef {import('../Visitor/Visitor.js').BaseVisitor} BaseVisitor
 */

export class Expresion  {

    /**
    * @param {Object} options
    * @param {Location|null} options.location Ubicacion Nodo En Codigo Fuente
    */
    constructor() {
        
        
        /**
         * Ubicacion Nodo En Codigo Fuente
         * @type {Location|null}
        */
        this.location = null;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitExpresion(this);
    }
}
    
export class OperacionBinaria extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.izquierda Expresion izquierda de la operacion
 * @param {Expresion} options.derecha Expresion derecha de la operacion
 * @param {string} options.operador Operador de la operacion
    */
    constructor({ izquierda, derecha, operador }) {
        super();
        
        /**
         * Expresion izquierda de la operacion
         * @type {Expresion}
        */
        this.izquierda = izquierda;


        /**
         * Expresion derecha de la operacion
         * @type {Expresion}
        */
        this.derecha = derecha;


        /**
         * Operador de la operacion
         * @type {string}
        */
        this.operador = operador;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitOperacionBinaria(this);
    }
}
    
export class OperacionUnaria extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.expresion Expresion de la operacion
 * @param {string} options.operador Operador de la operacion
    */
    constructor({ expresion, operador }) {
        super();
        
        /**
         * Expresion de la operacion
         * @type {Expresion}
        */
        this.expresion = expresion;


        /**
         * Operador de la operacion
         * @type {string}
        */
        this.operador = operador;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitOperacionUnaria(this);
    }
}
    
export class Agrupacion extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.expresion Expresion agrupada
    */
    constructor({ expresion }) {
        super();
        
        /**
         * Expresion agrupada
         * @type {Expresion}
        */
        this.expresion = expresion;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAgrupacion(this);
    }
}
    
export class Entero extends Expresion {

    /**
    * @param {Object} options
    * @param {int} options.valor Valor del entero
 * @param {string} options.tipo Tipo Int
    */
    constructor({ valor, tipo }) {
        super();
        
        /**
         * Valor del entero
         * @type {int}
        */
        this.valor = valor;


        /**
         * Tipo Int
         * @type {string}
        */
        this.tipo = tipo;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitEntero(this);
    }
}
    
export class Decimal extends Expresion {

    /**
    * @param {Object} options
    * @param {float} options.valor Valor del float
 * @param {string} options.tipo Tipo Float
    */
    constructor({ valor, tipo }) {
        super();
        
        /**
         * Valor del float
         * @type {float}
        */
        this.valor = valor;


        /**
         * Tipo Float
         * @type {string}
        */
        this.tipo = tipo;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitDecimal(this);
    }
}
    
export class Cadena extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.valor Valor del la cadena
 * @param {string} options.tipo Tipo Cadena
    */
    constructor({ valor, tipo }) {
        super();
        
        /**
         * Valor del la cadena
         * @type {string}
        */
        this.valor = valor;


        /**
         * Tipo Cadena
         * @type {string}
        */
        this.tipo = tipo;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitCadena(this);
    }
}
    
export class Caracter extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.valor Valor del caracter
 * @param {string} options.tipo Tipo Char
    */
    constructor({ valor, tipo }) {
        super();
        
        /**
         * Valor del caracter
         * @type {string}
        */
        this.valor = valor;


        /**
         * Tipo Char
         * @type {string}
        */
        this.tipo = tipo;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitCaracter(this);
    }
}
    
export class Booleano extends Expresion {

    /**
    * @param {Object} options
    * @param {boolean} options.valor Valor del booleano
 * @param {string} options.tipo Tipo Boolean
    */
    constructor({ valor, tipo }) {
        super();
        
        /**
         * Valor del booleano
         * @type {boolean}
        */
        this.valor = valor;


        /**
         * Tipo Boolean
         * @type {string}
        */
        this.tipo = tipo;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitBooleano(this);
    }
}
    
export class DeclaracionVar extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipo Tipo Variable
 * @param {string} options.id Identificadar Variable
 * @param {Expresion} options.expresion Expresion Variable
    */
    constructor({ tipo, id, expresion }) {
        super();
        
        /**
         * Tipo Variable
         * @type {string}
        */
        this.tipo = tipo;


        /**
         * Identificadar Variable
         * @type {string}
        */
        this.id = id;


        /**
         * Expresion Variable
         * @type {Expresion}
        */
        this.expresion = expresion;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitDeclaracionVar(this);
    }
}
    
export class ReferenciaVariable extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la variable
    */
    constructor({ id }) {
        super();
        
        /**
         * Identificador de la variable
         * @type {string}
        */
        this.id = id;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitReferenciaVariable(this);
    }
}
    
export class Print extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.expresion Expresion a imprimir
    */
    constructor({ expresion }) {
        super();
        
        /**
         * Expresion a imprimir
         * @type {Expresion}
        */
        this.expresion = expresion;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitPrint(this);
    }
}
    
export class Ternario extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.condicion Condicion a evaluar
 * @param {Expresion} options.verdadero Si la condicion es  verdadera
 * @param {Expresion} options.falso Si la condicion es falsa
    */
    constructor({ condicion, verdadero, falso }) {
        super();
        
        /**
         * Condicion a evaluar
         * @type {Expresion}
        */
        this.condicion = condicion;


        /**
         * Si la condicion es  verdadera
         * @type {Expresion}
        */
        this.verdadero = verdadero;


        /**
         * Si la condicion es falsa
         * @type {Expresion}
        */
        this.falso = falso;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitTernario(this);
    }
}
    
export class Asignacion extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la variable
 * @param {Expresion} options.asignacion Expresion a asignar
    */
    constructor({ id, asignacion }) {
        super();
        
        /**
         * Identificador de la variable
         * @type {string}
        */
        this.id = id;


        /**
         * Expresion a asignar
         * @type {Expresion}
        */
        this.asignacion = asignacion;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAsignacion(this);
    }
}
    
export class Bloque extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion[]} options.sentencias Sentencias del bloque
    */
    constructor({ sentencias }) {
        super();
        
        /**
         * Sentencias del bloque
         * @type {Expresion[]}
        */
        this.sentencias = sentencias;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitBloque(this);
    }
}
    
export class If extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.condicion Condicion del if
 * @param {Expresion} options.sentenciasVerdadero Cuerpo del if
 * @param {Expresion|undefined} options.sentenciasFalso Cuerpo del else
    */
    constructor({ condicion, sentenciasVerdadero, sentenciasFalso }) {
        super();
        
        /**
         * Condicion del if
         * @type {Expresion}
        */
        this.condicion = condicion;


        /**
         * Cuerpo del if
         * @type {Expresion}
        */
        this.sentenciasVerdadero = sentenciasVerdadero;


        /**
         * Cuerpo del else
         * @type {Expresion|undefined}
        */
        this.sentenciasFalso = sentenciasFalso;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitIf(this);
    }
}
    
export class While extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.condicion Condicion del while
 * @param {Expresion} options.sentencias Cuerpo del while
    */
    constructor({ condicion, sentencias }) {
        super();
        
        /**
         * Condicion del while
         * @type {Expresion}
        */
        this.condicion = condicion;


        /**
         * Cuerpo del while
         * @type {Expresion}
        */
        this.sentencias = sentencias;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitWhile(this);
    }
}
    
export class Switch extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.condicion Condicion del switch
 * @param {Expresion} options.cases Casos del switch
 * @param {Expresion} options.default1 Caso por defecto
    */
    constructor({ condicion, cases, default1 }) {
        super();
        
        /**
         * Condicion del switch
         * @type {Expresion}
        */
        this.condicion = condicion;


        /**
         * Casos del switch
         * @type {Expresion}
        */
        this.cases = cases;


        /**
         * Caso por defecto
         * @type {Expresion}
        */
        this.default1 = default1;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitSwitch(this);
    }
}
    
export class For extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.declaracion Inicializacion del for
 * @param {Expresion} options.condicion Condicion del for
 * @param {Expresion} options.incremento Incremento del for
 * @param {Expresion} options.sentencia Cuerpo del for
    */
    constructor({ declaracion, condicion, incremento, sentencia }) {
        super();
        
        /**
         * Inicializacion del for
         * @type {Expresion}
        */
        this.declaracion = declaracion;


        /**
         * Condicion del for
         * @type {Expresion}
        */
        this.condicion = condicion;


        /**
         * Incremento del for
         * @type {Expresion}
        */
        this.incremento = incremento;


        /**
         * Cuerpo del for
         * @type {Expresion}
        */
        this.sentencia = sentencia;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitFor(this);
    }
}
    
export class ForEach extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipo Tipo de los elementos del arreglo
 * @param {string} options.id Identificador del arreglo
 * @param {string} options.arreglo Identificador del arreglo
 * @param {Expresion} options.sentencias Cuerpo del forEach
    */
    constructor({ tipo, id, arreglo, sentencias }) {
        super();
        
        /**
         * Tipo de los elementos del arreglo
         * @type {string}
        */
        this.tipo = tipo;


        /**
         * Identificador del arreglo
         * @type {string}
        */
        this.id = id;


        /**
         * Identificador del arreglo
         * @type {string}
        */
        this.arreglo = arreglo;


        /**
         * Cuerpo del forEach
         * @type {Expresion}
        */
        this.sentencias = sentencias;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitForEach(this);
    }
}
    
export class Break extends Expresion {

    /**
    * @param {Object} options
    * 
    */
    constructor() {
        super();
        
    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitBreak(this);
    }
}
    
export class Continue extends Expresion {

    /**
    * @param {Object} options
    * 
    */
    constructor() {
        super();
        
    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitContinue(this);
    }
}
    
export class Return extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion|undefined} options.expresion Valor a retornar
    */
    constructor({ expresion }) {
        super();
        
        /**
         * Valor a retornar
         * @type {Expresion|undefined}
        */
        this.expresion = expresion;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitReturn(this);
    }
}
    
export class Llamada extends Expresion {

    /**
    * @param {Object} options
    * @param {Expresion} options.callee Expresion a llamar
 * @param {Expresion[]} options.argumentos Argumentos de la llamada
    */
    constructor({ callee, argumentos }) {
        super();
        
        /**
         * Expresion a llamar
         * @type {Expresion}
        */
        this.callee = callee;


        /**
         * Argumentos de la llamada
         * @type {Expresion[]}
        */
        this.argumentos = argumentos;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitLlamada(this);
    }
}
    
export class Embebida extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.Nombre Nombre de la funcion embebida
 * @param {Expresion} options.Argumento Argumentos de la llamada
    */
    constructor({ Nombre, Argumento }) {
        super();
        
        /**
         * Nombre de la funcion embebida
         * @type {string}
        */
        this.Nombre = Nombre;


        /**
         * Argumentos de la llamada
         * @type {Expresion}
        */
        this.Argumento = Argumento;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitEmbebida(this);
    }
}
    
export class DeclaracionArreglo1 extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipo Tipo de los elementos del arreglo
 * @param {Expresion} options.id Identificador del arreglo
 * @param {Expresion} options.valores Valores del arreglo
    */
    constructor({ tipo, id, valores }) {
        super();
        
        /**
         * Tipo de los elementos del arreglo
         * @type {string}
        */
        this.tipo = tipo;


        /**
         * Identificador del arreglo
         * @type {Expresion}
        */
        this.id = id;


        /**
         * Valores del arreglo
         * @type {Expresion}
        */
        this.valores = valores;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitDeclaracionArreglo1(this);
    }
}
    
export class DeclaracionArreglo2 extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipo1 Tipo de los elementos del arreglo
 * @param {Expresion} options.id Identificador del arreglo
 * @param {string} options.tipo2 Tipo de los elementos del arreglo
 * @param {Expresion} options.numero Tamaño del arreglo
    */
    constructor({ tipo1, id, tipo2, numero }) {
        super();
        
        /**
         * Tipo de los elementos del arreglo
         * @type {string}
        */
        this.tipo1 = tipo1;


        /**
         * Identificador del arreglo
         * @type {Expresion}
        */
        this.id = id;


        /**
         * Tipo de los elementos del arreglo
         * @type {string}
        */
        this.tipo2 = tipo2;


        /**
         * Tamaño del arreglo
         * @type {Expresion}
        */
        this.numero = numero;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitDeclaracionArreglo2(this);
    }
}
    
export class DeclaracionArreglo3 extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipo Tipo de los elementos del arreglo
 * @param {Expresion} options.id1 Identificador del arreglo
 * @param {string} options.id2 Valor del arreglo
    */
    constructor({ tipo, id1, id2 }) {
        super();
        
        /**
         * Tipo de los elementos del arreglo
         * @type {string}
        */
        this.tipo = tipo;


        /**
         * Identificador del arreglo
         * @type {Expresion}
        */
        this.id1 = id1;


        /**
         * Valor del arreglo
         * @type {string}
        */
        this.id2 = id2;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitDeclaracionArreglo3(this);
    }
}
    
export class IndexArreglo extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador del arreglo
 * @param {Expresion} options.index Indice a buscar
    */
    constructor({ id, index }) {
        super();
        
        /**
         * Identificador del arreglo
         * @type {string}
        */
        this.id = id;


        /**
         * Indice a buscar
         * @type {Expresion}
        */
        this.index = index;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitIndexArreglo(this);
    }
}
    
export class JoinArreglo extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Expresiones a unir
    */
    constructor({ id }) {
        super();
        
        /**
         * Expresiones a unir
         * @type {string}
        */
        this.id = id;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitJoinArreglo(this);
    }
}
    
export class LengthArreglo extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Expresiones a unir
    */
    constructor({ id }) {
        super();
        
        /**
         * Expresiones a unir
         * @type {string}
        */
        this.id = id;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitLengthArreglo(this);
    }
}
    
export class AccesoArreglo extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador del arreglo
 * @param {Expresion} options.index Indice a buscar
    */
    constructor({ id, index }) {
        super();
        
        /**
         * Identificador del arreglo
         * @type {string}
        */
        this.id = id;


        /**
         * Indice a buscar
         * @type {Expresion}
        */
        this.index = index;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAccesoArreglo(this);
    }
}
    
export class AsignacionArreglo extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador del arreglo
 * @param {Expresion} options.index Indice a buscar
 * @param {Expresion} options.valor Valor a asignar
    */
    constructor({ id, index, valor }) {
        super();
        
        /**
         * Identificador del arreglo
         * @type {string}
        */
        this.id = id;


        /**
         * Indice a buscar
         * @type {Expresion}
        */
        this.index = index;


        /**
         * Valor a asignar
         * @type {Expresion}
        */
        this.valor = valor;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAsignacionArreglo(this);
    }
}
    
export class DeclaracionMatriz1 extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipo Tipo de elementos de la matriz
 * @param {Expresion} options.dimensiones Dimensiones de la matriz
 * @param {Expresion} options.id Identificador del la matriz
 * @param {Expresion} options.valores Valores del la matriz
    */
    constructor({ tipo, dimensiones, id, valores }) {
        super();
        
        /**
         * Tipo de elementos de la matriz
         * @type {string}
        */
        this.tipo = tipo;


        /**
         * Dimensiones de la matriz
         * @type {Expresion}
        */
        this.dimensiones = dimensiones;


        /**
         * Identificador del la matriz
         * @type {Expresion}
        */
        this.id = id;


        /**
         * Valores del la matriz
         * @type {Expresion}
        */
        this.valores = valores;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitDeclaracionMatriz1(this);
    }
}
    
export class DeclaracionMatriz2 extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipo1 Tipo de elementos de la matriz
 * @param {Expresion} options.dimensiones Dimensiones de la matriz
 * @param {Expresion} options.id Identificador del la matriz
 * @param {string} options.tipo2 Tipo de elementos de la matriz
 * @param {Expresion} options.valores Valores del la matriz
    */
    constructor({ tipo1, dimensiones, id, tipo2, valores }) {
        super();
        
        /**
         * Tipo de elementos de la matriz
         * @type {string}
        */
        this.tipo1 = tipo1;


        /**
         * Dimensiones de la matriz
         * @type {Expresion}
        */
        this.dimensiones = dimensiones;


        /**
         * Identificador del la matriz
         * @type {Expresion}
        */
        this.id = id;


        /**
         * Tipo de elementos de la matriz
         * @type {string}
        */
        this.tipo2 = tipo2;


        /**
         * Valores del la matriz
         * @type {Expresion}
        */
        this.valores = valores;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitDeclaracionMatriz2(this);
    }
}
    
export class AsignacionMatriz extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la matriz
 * @param {Expresion} options.indices Indices de la matriz
 * @param {Expresion} options.NuevoDato Valor a asignar
    */
    constructor({ id, indices, NuevoDato }) {
        super();
        
        /**
         * Identificador de la matriz
         * @type {string}
        */
        this.id = id;


        /**
         * Indices de la matriz
         * @type {Expresion}
        */
        this.indices = indices;


        /**
         * Valor a asignar
         * @type {Expresion}
        */
        this.NuevoDato = NuevoDato;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAsignacionMatriz(this);
    }
}
    
export class AccesoMatriz extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la matriz
 * @param {Expresion} options.valores Indices de la matriz
    */
    constructor({ id, valores }) {
        super();
        
        /**
         * Identificador de la matriz
         * @type {string}
        */
        this.id = id;


        /**
         * Indices de la matriz
         * @type {Expresion}
        */
        this.valores = valores;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAccesoMatriz(this);
    }
}
    
export class FuncionForanea extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipo Tipo de la funcion.
 * @param {string} options.id Identificador de la funcion
 * @param {string[]} options.parametros Parametros de la funcion
 * @param {Bloque} options.bloque Cuerpo de la funcion
    */
    constructor({ tipo, id, parametros, bloque }) {
        super();
        
        /**
         * Tipo de la funcion.
         * @type {string}
        */
        this.tipo = tipo;


        /**
         * Identificador de la funcion
         * @type {string}
        */
        this.id = id;


        /**
         * Parametros de la funcion
         * @type {string[]}
        */
        this.parametros = parametros;


        /**
         * Cuerpo de la funcion
         * @type {Bloque}
        */
        this.bloque = bloque;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitFuncionForanea(this);
    }
}
    
export class Struct extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.id Identificador de la clase
 * @param {Expresion[]} options.atributos Declaraciones de la clase
    */
    constructor({ id, atributos }) {
        super();
        
        /**
         * Identificador de la clase
         * @type {string}
        */
        this.id = id;


        /**
         * Declaraciones de la clase
         * @type {Expresion[]}
        */
        this.atributos = atributos;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitStruct(this);
    }
}
    
export class DeclaracionStruct extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipo Tipo de la estructura
 * @param {string} options.id Identificador de la estructura
 * @param {Expresion} options.expresion Expresion de la estructura
    */
    constructor({ tipo, id, expresion }) {
        super();
        
        /**
         * Tipo de la estructura
         * @type {string}
        */
        this.tipo = tipo;


        /**
         * Identificador de la estructura
         * @type {string}
        */
        this.id = id;


        /**
         * Expresion de la estructura
         * @type {Expresion}
        */
        this.expresion = expresion;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitDeclaracionStruct(this);
    }
}
    
export class AsignacionStruct extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.tipo Tipo de la estructura
 * @param {Expresion[]} options.atributos Atributos de la estructura
    */
    constructor({ tipo, atributos }) {
        super();
        
        /**
         * Tipo de la estructura
         * @type {string}
        */
        this.tipo = tipo;


        /**
         * Atributos de la estructura
         * @type {Expresion[]}
        */
        this.atributos = atributos;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAsignacionStruct(this);
    }
}
    
export class AccesoAtributo extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.instancia Instancia del atributo
 * @param {string[]} options.atributo Atributo a acceder
    */
    constructor({ instancia, atributo }) {
        super();
        
        /**
         * Instancia del atributo
         * @type {string}
        */
        this.instancia = instancia;


        /**
         * Atributo a acceder
         * @type {string[]}
        */
        this.atributo = atributo;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAccesoAtributo(this);
    }
}
    
export class AsignacionAtributo extends Expresion {

    /**
    * @param {Object} options
    * @param {string} options.instancia Instancia del atributo
 * @param {string[]} options.atributo Atributo a acceder
 * @param {Expresion} options.expresion Expresion a asignar
    */
    constructor({ instancia, atributo, expresion }) {
        super();
        
        /**
         * Instancia del atributo
         * @type {string}
        */
        this.instancia = instancia;


        /**
         * Atributo a acceder
         * @type {string[]}
        */
        this.atributo = atributo;


        /**
         * Expresion a asignar
         * @type {Expresion}
        */
        this.expresion = expresion;

    }

    /**
     * @param {BaseVisitor} visitor
     */
    accept(visitor) {
        return visitor.visitAsignacionAtributo(this);
    }
}
    
export default { Expresion, OperacionBinaria, OperacionUnaria, Agrupacion, Entero, Decimal, Cadena, Caracter, Booleano, DeclaracionVar, ReferenciaVariable, Print, Ternario, Asignacion, Bloque, If, While, Switch, For, ForEach, Break, Continue, Return, Llamada, Embebida, DeclaracionArreglo1, DeclaracionArreglo2, DeclaracionArreglo3, IndexArreglo, JoinArreglo, LengthArreglo, AccesoArreglo, AsignacionArreglo, DeclaracionMatriz1, DeclaracionMatriz2, AsignacionMatriz, AccesoMatriz, FuncionForanea, Struct, DeclaracionStruct, AsignacionStruct, AccesoAtributo, AsignacionAtributo }
