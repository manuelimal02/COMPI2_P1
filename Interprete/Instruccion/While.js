export class WhileHandler {
    /**
     * @param {any} condicion 
     * @param {any} sentencias 
     * @param {BaseVisitor} visitor
     */
    constructor(condicion, sentencias, visitor) {
        this.condicion = condicion;
        this.sentencias = sentencias;
        this.visitor = visitor;
    }

    EjecutarHandler() {
        while (this.condicion.accept(this.visitor).valor) {
            this.sentencias.accept(this.visitor);
        }
    }
}
