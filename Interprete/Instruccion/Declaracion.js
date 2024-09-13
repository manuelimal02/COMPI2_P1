import ErrorManager from "../Errores/Errores.js";
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
        
        if (this.tipo !== 'int' && this.tipo !== 'float' && this.tipo !== 'string' && this.tipo !== 'char' && this.tipo !== 'boolean' && this.tipo !== 'var' && !this.entornoActual.getStruct(this.tipo)) {
            throw new Error(`Tipo De Dato No Válido: "${this.tipo}".`);
        }
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
        if (tipo === 'int' || tipo === 'float' || tipo === 'char' || tipo === 'string' || tipo === 'boolean') {
            return tipo;
        } else if (this.entornoActual.getStruct(tipo)) {
            return tipo;
        }
        else {
            throw new Error(`No Se Puede Determinar El Tipo De Dato De: "${this.nombre}".`);
        }
    }

    ValorPorDefecto(tipo) {
        switch (tipo) {
            case 'int': return {valor: null, tipo: 'int'};
            case 'float': return {valor: null, tipo: 'float'};
            case 'string': return {valor: null, tipo: 'string'};
            case 'boolean': return {valor: null, tipo: 'boolean'};
            case 'char': return {valor: null, tipo: 'char'};
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
            ErrorManager.NuevoError(`La Variable: "${this.nombre}" Debe Ser Tipo: "${tipoInferido}".`, this.linea, this.columna);
            entorno.setVariable(tipoInferido, this.nombre, {valor: null, tipo:tipoInferido}, this.linea, this.columna);
        }
    }
}
