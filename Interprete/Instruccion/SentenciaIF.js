export class IfHandler {
    /**
     * @param {any} condicion
     * @param {any} sentenciasVerdadero
     * @param {any} sentenciasFalso
     * @param {BaseVisitor} visitor
     */
    constructor(condicion, sentenciasVerdadero, sentenciasFalso, visitor) {
        this.condicion = condicion;
        this.sentenciasVerdadero = sentenciasVerdadero;
        this.sentenciasFalso = sentenciasFalso;
        this.visitor = visitor;
    }
    EjecutarHandler() {
        const resultadoCondicion = this.condicion.accept(this.visitor);
        if (typeof resultadoCondicion !== 'boolean') {
            throw new Error('Error: La condición en una estructura if debe ser de tipo boolean.');
        }
        if (resultadoCondicion) {
            this.sentenciasVerdadero.accept(this.visitor);
        } else if (this.sentenciasFalso) {
            this.sentenciasFalso.accept(this.visitor);
        }
    }
}
