export class TernarioHandler {
    /**
     * @param {any} condicion
     * @param {any} verdadero
     * @param {any} falso
     * @param {BaseVisitor} visitor
     */
    constructor(condicion, verdadero, falso, visitor) {
        this.condicion = condicion;
        this.verdadero = verdadero;
        this.falso = falso;
        this.visitor = visitor;
    }

    EjecutarHandler() {
        const resultadoCondicion = this.condicion.accept(this.visitor);
        if (resultadoCondicion.tipo !== 'boolean') {
            throw new Error('Error: La Condición En Una Expresión Ternaria Debe Ser De Tipo Boolean.');
        }
        if (resultadoCondicion.valor) {
            return  this.verdadero.accept(this.visitor);
        } else {
            return  this.falso.accept(this.visitor);
        }
    }
    
}
