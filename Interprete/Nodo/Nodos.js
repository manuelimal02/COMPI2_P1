
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
    
export default { Expresion, OperacionBinaria, OperacionUnaria, Agrupacion, Entero, Decimal, Cadena, Caracter, Booleano, DeclaracionVar, ReferenciaVariable, Print, Ternario, Asignacion, Bloque, If, While, Switch, For, Break, Continue, Return, Llamada, Embebida }
