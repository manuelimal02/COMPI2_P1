export class DeclaracionVariableHandler {
    constructor(tipo, nombre, expresion, entornoActual, linea, columna, visitor) {
        this.tipo = tipo;
        this.nombre = nombre;
        this.expresion = expresion;
        this.entornoActual = entornoActual;
        this.linea = linea;
        this.columna = columna;
        this.visitor = visitor;
    }

    EjecutarHandler() {
        let valor;
        let tipoInferido = this.tipo;
        if (this.tipo === 'var' && !this.expresion) {
            throw new Error(`La Variable "${this.nombre}" De Tipo "var" Debe Tener Una Expresión Para Inferir Su Tipo.`);
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
        const tipo = valor.tipo;
        if (tipo === 'int' || tipo === 'float' || tipo === 'char' || tipo === 'string' || tipo === 'bool') {
            return tipo;
        } else {
            throw new Error(`No Se Puede Determinar El Tipo De Dato De: "${this.nombre}".`);
        }
    }

    ValorPorDefecto(tipo) {
        switch (tipo) {
            case 'int': return {valor: 0, tipo: 'int'};
            case 'float': return {valor: 0.0, tipo: 'float'};
            case 'string': return {valor: '', tipo: 'string'};
            case 'boolean': return {valor: true, tipo: 'boolean'};
            case 'char': return {valor: '\0', tipo: 'char'};
            default: throw new Error(`Tipo De Variable: "${tipo}" No Válido.`);
        }
    }

    DeclararVariable(tipoInferido, valor) {
        const entorno = this.entornoActual;
        if (tipoInferido === 'float' && valor.tipo === 'int' || tipoInferido === 'float' && valor.tipo === 'float') {
            valor.tipo = 'float';
            entorno.setVariable(tipoInferido, this.nombre, valor, this.linea, this.columna);
            return;
        }
        if (tipoInferido === valor.tipo) {
            entorno.setVariable(tipoInferido, this.nombre, valor, this.linea, this.columna);
        } else {
            throw new Error(`La Variable: "${this.nombre}" Debe Ser Tipo: "${tipoInferido}".`);
        }
    }
}
