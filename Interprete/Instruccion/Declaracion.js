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
        if (this.tipo === 'var' && !this.expresion) {
            throw new Error(`La variable "${this.nombre}" de tipo 'var' debe tener una expresión para inferir su tipo.`);
        }
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
            throw new Error(`No Se Puede Determinar El Tipo De Dato De: "${this.nombre}".`);
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
            default: throw new Error(`Tipo De Variable: "${tipo}" No Válido.`);
        }
    }

    DeclararVariable(tipoInferido, valor) {
        const entorno = this.entornoActual;
        if (tipoInferido === 'int' && typeof valor === 'number' && Number.isInteger(valor)) {
            entorno.setVariable(tipoInferido, this.nombre, valor);
        } else if (tipoInferido === 'float' && typeof valor === 'number') {
            entorno.setVariable(tipoInferido, this.nombre, valor);
        }else if (tipoInferido === 'char' && typeof valor === 'string' && valor.length === 1) {
                entorno.setVariable(tipoInferido, this.nombre, valor);
        } else if (tipoInferido === 'string' && typeof valor === 'string') {
            entorno.setVariable(tipoInferido, this.nombre, valor);
        } else if (tipoInferido === 'bool' && typeof valor === 'boolean') {
            entorno.setVariable(tipoInferido, this.nombre, valor);
        } else if (tipoInferido === 'var') {
            entorno.setVariable(tipoInferido, this.nombre, valor);
        } else {
            throw new Error(`La Variable: "${this.nombre}" Debe Ser Tipo: "${tipoInferido}".`);
        }
    }
}