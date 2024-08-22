
/**

 * @typedef {import('../Nodo/Nodos.js').Expresion} Expresion


 * @typedef {import('../Nodo/Nodos.js').OperacionBinaria} OperacionBinaria


 * @typedef {import('../Nodo/Nodos.js').OperacionUnaria} OperacionUnaria


 * @typedef {import('../Nodo/Nodos.js').Agrupacion} Agrupacion


 * @typedef {import('../Nodo/Nodos.js').Numero} Numero


 * @typedef {import('../Nodo/Nodos.js').Cadena} Cadena


 * @typedef {import('../Nodo/Nodos.js').Caracter} Caracter


 * @typedef {import('../Nodo/Nodos.js').Booleano} Booleano


 * @typedef {import('../Nodo/Nodos.js').DeclaracionVar} DeclaracionVar


 * @typedef {import('../Nodo/Nodos.js').ReferenciaVariable} ReferenciaVariable


 * @typedef {import('../Nodo/Nodos.js').Print} Print


 * @typedef {import('../Nodo/Nodos.js').ExpresionStmt} ExpresionStmt


 * @typedef {import('../Nodo/Nodos.js').Asignacion} Asignacion


 * @typedef {import('../Nodo/Nodos.js').Bloque} Bloque


 * @typedef {import('../Nodo/Nodos.js').If} If


 * @typedef {import('../Nodo/Nodos.js').While} While

 */


/**
 * Clase base para los visitantes
 * @abstract
 */
export class BaseVisitor {

    
    /**
     * @param {Expresion} node
     * @returns {any}
     */
    visitExpresion(node) {
        throw new Error('Metodo visitExpresion no implementado');
    }
    

    /**
     * @param {OperacionBinaria} node
     * @returns {any}
     */
    visitOperacionBinaria(node) {
        throw new Error('Metodo visitOperacionBinaria no implementado');
    }
    

    /**
     * @param {OperacionUnaria} node
     * @returns {any}
     */
    visitOperacionUnaria(node) {
        throw new Error('Metodo visitOperacionUnaria no implementado');
    }
    

    /**
     * @param {Agrupacion} node
     * @returns {any}
     */
    visitAgrupacion(node) {
        throw new Error('Metodo visitAgrupacion no implementado');
    }
    

    /**
     * @param {Numero} node
     * @returns {any}
     */
    visitNumero(node) {
        throw new Error('Metodo visitNumero no implementado');
    }
    

    /**
     * @param {Cadena} node
     * @returns {any}
     */
    visitCadena(node) {
        throw new Error('Metodo visitCadena no implementado');
    }
    

    /**
     * @param {Caracter} node
     * @returns {any}
     */
    visitCaracter(node) {
        throw new Error('Metodo visitCaracter no implementado');
    }
    

    /**
     * @param {Booleano} node
     * @returns {any}
     */
    visitBooleano(node) {
        throw new Error('Metodo visitBooleano no implementado');
    }
    

    /**
     * @param {DeclaracionVar} node
     * @returns {any}
     */
    visitDeclaracionVar(node) {
        throw new Error('Metodo visitDeclaracionVar no implementado');
    }
    

    /**
     * @param {ReferenciaVariable} node
     * @returns {any}
     */
    visitReferenciaVariable(node) {
        throw new Error('Metodo visitReferenciaVariable no implementado');
    }
    

    /**
     * @param {Print} node
     * @returns {any}
     */
    visitPrint(node) {
        throw new Error('Metodo visitPrint no implementado');
    }
    

    /**
     * @param {ExpresionStmt} node
     * @returns {any}
     */
    visitExpresionStmt(node) {
        throw new Error('Metodo visitExpresionStmt no implementado');
    }
    

    /**
     * @param {Asignacion} node
     * @returns {any}
     */
    visitAsignacion(node) {
        throw new Error('Metodo visitAsignacion no implementado');
    }
    

    /**
     * @param {Bloque} node
     * @returns {any}
     */
    visitBloque(node) {
        throw new Error('Metodo visitBloque no implementado');
    }
    

    /**
     * @param {If} node
     * @returns {any}
     */
    visitIf(node) {
        throw new Error('Metodo visitIf no implementado');
    }
    

    /**
     * @param {While} node
     * @returns {any}
     */
    visitWhile(node) {
        throw new Error('Metodo visitWhile no implementado');
    }
    
}
