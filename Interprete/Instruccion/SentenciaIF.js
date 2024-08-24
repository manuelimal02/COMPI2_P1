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
        if (resultadoCondicion.tipo !== 'boolean') {
            throw new Error('Error: La Condición En Una Estructura If Debe Ser De Tipo Boolean.');
        }
        if (resultadoCondicion.valor) {
            this.sentenciasVerdadero.accept(this.visitor);
            return { valor: this.sentenciasVerdadero.valor}
        }
        if (this.sentenciasFalso) {
            this.sentenciasFalso.accept(this.visitor);
            return { valor: this.sentenciasFalso.valor}
        }
    }
}