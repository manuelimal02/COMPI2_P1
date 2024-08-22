export class DeclaracionVariableHandler {
    /**
         * @param {string} tipo
         * @param {string} nombre
         * @param {any} expresion
         * @param {Entorno} entornoActual
         * @param {BaseVisitor} visitor
         */
    constructor(tipo, nombre, expresion, entornoActual, visitor) {
        this.tipo = tipo;
        this.nombre = nombre;
        this.expresion = expresion;
        this.entornoActual = entornoActual;
        this.visitor = visitor;
    }

    EjecutarHandler() {
        let valor;
        let tipoInferido = this.tipo;
        if (this.expresion) {
            valor = this.expresion.accept(this.visitor);
            if (this.tipo === 'var') {
                tipoInferido = this.DefinirTipoVar(valor);
            }
        } else {
            valor = this.ValorPorDefecto(tipoInferido);
        }
        this.DeclararVariable(tipoInferido, valor);
    }

    DefinirTipoVar(valor) {
        if (typeof valor === 'number') {
            return Number.isInteger(valor) ? 'int' : 'float';
        } else if (typeof valor === 'string') {
            return valor.length === 1 ? 'char' : 'string';
        } else if (typeof valor === 'boolean') {
            return 'bool';
        } else {
            throw new Error(`No se puede determinar el tipo de la variable "${this.nombre}".`);
        }
    }

    ValorPorDefecto(tipo) {
        switch (tipo) {
            case 'int': return 0;
            case 'float': return 0.0;
            case 'string': return '';
            case 'bool': return true;
            case 'char': return '\0';
            case 'var': return null;
            default: throw new Error(`Tipo de variable "${tipo}" no válido.`);
        }
    }

    DeclararVariable(tipoInferido, valor) {
        const entorno = this.entornoActual;
        if (tipoInferido === 'int' && typeof valor === 'number' && Number.isInteger(valor)) {
            entorno.setVariable(tipoInferido, this.nombre, valor);
        } else if (tipoInferido === 'float' && typeof valor === 'number') {
            entorno.setVariable(tipoInferido, this.nombre, valor);
        } else if (tipoInferido === 'string' && typeof valor === 'string') {
            entorno.setVariable(tipoInferido, this.nombre, valor);
        } else if (tipoInferido === 'bool' && typeof valor === 'boolean') {
            entorno.setVariable(tipoInferido, this.nombre, valor);
        } else if (tipoInferido === 'char' && typeof valor === 'string' && valor.length === 1) {
            entorno.setVariable(tipoInferido, this.nombre, valor);
        } else if (tipoInferido === 'var') {
            entorno.setVariable(tipoInferido, this.nombre, valor);
        } else {
            throw new Error(`La variable "${this.nombre}" debe ser de tipo ${tipoInferido}.`);
        }
    }
}