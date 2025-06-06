import { Foranea } from "../Instruccion/Foranea.js";
import ErrorManager from "../Errores/Errores.js";

let Simbolos = [];
let SimbolosConvertidos = [];
export class Entorno {
    
    /**
     * @param {Entorno} padre
     */
    constructor(padre = undefined) {
        this.valores = {};
        this.structs = {};
        this.padre = padre;
    }

    /**
     * @param {string} nombre
     * @param {any} valor
     * @param {string} linea
     * @param {string} columna
     */
    setVariable(tipo, nombre, valor, linea, columna) {
        if (this.valores[nombre]) {
            throw new Error(`La Variable: "${nombre}" Ya Está Definida.`);
        }
        Simbolos.push({tipo: tipo, nombre: nombre, valor: valor, fila: linea, columna: columna });
        this.valores[nombre] = { valor, tipo, linea, columna }
    }

    /**
     * @param {string} nombre
     */
    getVariable(nombre) {
        const variable = this.valores[nombre];
        if (variable!=undefined) {
            return variable;
        }
        if (!variable && this.padre) {
            return this.padre.getVariable(nombre);
        }
    }

    /**
     * @param {string} nombre
     * @param {any} valor
     * @param {string} linea
     * @param {string} columna
     */
    assignVariable(nombre, valor) {
        const variable = this.valores[nombre]
        if (variable != undefined) {
            if (variable.tipo === "string" && valor.tipo !== "string") {
                console.warn(`El Tipo De La Variable: "${nombre}" Es "${variable.tipo}". El Tipo Del Valor Es: "${valor.tipo}" Se Asignará Null.`);
                ErrorManager.NuevoError(`El Tipo De La Variable: "${nombre}" Es "${variable.tipo}". El Tipo Del Valor Es: "${valor.tipo}" Se Asignará Null.`, variable.linea, variable.columna);
                this.valores[nombre].valor = {valor: null, tipo: 'string'};
                this.valores[nombre].tipo = 'string';
            }else if (variable.tipo === "int" && valor.tipo !== "int") {
                console.warn(`El Tipo De La Variable: "${nombre}" Es "${variable.tipo}". El Tipo Del Valor Es: "${valor.tipo}" Se Asignará Null.`);
                ErrorManager.NuevoError(`El Tipo De La Variable: "${nombre}" Es "${variable.tipo}". El Tipo Del Valor Es: "${valor.tipo}" Se Asignará Null.`, variable.linea, variable.columna);
                this.valores[nombre].valor = {valor: null, tipo: 'int'};
                this.valores[nombre].tipo = 'int';
            }else if (variable.tipo === "float" && valor.tipo === "int") {
                valor.valor = parseFloat(valor.valor);
                valor.tipo = 'float';
            }else if (variable.tipo === "float" && valor.tipo !== "float") {
                console.warn(`El Tipo De La Variable: "${nombre}" Es "${variable.tipo}". El Tipo Del Valor Es: "${valor.tipo}" Se Asignará Null.`);
                ErrorManager.NuevoError(`El Tipo De La Variable: "${nombre}" Es "${variable.tipo}". El Tipo Del Valor Es: "${valor.tipo}" Se Asignará Null.`, variable.linea, variable.columna);
                this.valores[nombre].valor = {valor: null, tipo: 'float'};
                this.valores[nombre].tipo = 'float';
            }else if (variable.tipo === "char" && valor.tipo !== "char") {
                console.warn(`El Tipo De La Variable: "${nombre}" Es "${variable.tipo}". El Tipo Del Valor Es: "${valor.tipo}" Se Asignará Null.`);
                ErrorManager.NuevoError(`El Tipo De La Variable: "${nombre}" Es "${variable.tipo}". El Tipo Del Valor Es: "${valor.tipo}" Se Asignará Null.`, variable.linea, variable.columna);
                this.valores[nombre].valor = {valor: null, tipo: 'char'};
                this.valores[nombre].tipo = 'char';
            }else if (variable.tipo === "boolean" && valor.tipo !== "boolean") {
                console.warn(`El Tipo De La Variable: "${nombre}" Es "${variable.tipo}". El Tipo Del Valor Es: "${valor.tipo}" Se Asignará Null.`);
                ErrorManager.NuevoError(`El Tipo De La Variable: "${nombre}" Es "${variable.tipo}". El Tipo Del Valor Es: "${valor.tipo}" Se Asignará Null.`, variable.linea, variable.columna);
                this.valores[nombre].valor = {valor: null, tipo: 'boolean'};
                this.valores[nombre].tipo = 'boolean';
            }else {
            this.valores[nombre].valor = {valor: valor.valor, tipo: valor.tipo};
            this.valores[nombre].tipo = valor.tipo; 
            }
            return;
        }
        if (!variable && this.padre) {
            this.padre.assignVariable(nombre, valor);
            return;
        }
        throw new Error(`La Variable "${nombre}" No Está Definida.`);
    }

    /**
     * @param {string} nombre
     */
    setTemporal(tipo, nombre, valor) {
        if(this.valores[nombre]) {
            throw new Error(`La Variable: "${nombre}" Ya Está Definida.`);
        }
        this.valores[nombre] = {valor, tipo}
    }

    setStruct(nombre, atributos) {
        if(this.valores[nombre]) {
            throw new Error(`La Variable: "${nombre}" Ya Está Declarada.`)
        }
        if(this.structs[nombre]){
            throw new Error(`El Struc: "${nombre}" Ya Está Declarado.`)
        }
        this.structs[nombre] = {nombre, atributos}
    }

    /**
     * @param {string} nombre 
     */
    getStruct(nombre) {
        const actual = this.structs[nombre]
        if(actual != undefined) {
            return actual
        }
        if(!actual && this.padre) {
            return this.padre.getStruct(nombre)
        }
    }

    assignStruct(nombre, atributos, valor) {
        let StructActual = this.valores[nombre];
        if (!StructActual) {
            throw new Error(`El Struc: "${nombre}" No Está Definido.`);
        }
        let StructPadre = StructActual.valor.valor;
        let StructTipo = StructActual.tipo;
        for (let i = 0; i < atributos.length - 1; i++) {
            const DefinicionStruct = this.getStruct(StructTipo);
            if (!DefinicionStruct) {
                throw new Error(`Definición De Struct No Encontrada Para: "${StructTipo}".`);
            }
            const atributo = DefinicionStruct.atributos.find(attr => attr.id === atributos[i]);
            if (!atributo) {
                throw new Error(`El Atributo: "${atributos[i]}" No Está Definido En EL Struct: "${StructTipo}".`);
            }
            if (!StructPadre[atributos[i]]) {
                StructPadre[atributos[i]] = { 
                    valor: {}, 
                    tipo: atributo.tipo 
                };
            }
            StructPadre = StructPadre[atributos[i]].valor;
            StructTipo = atributo.tipo;
        }
        const UltimoAtributo = atributos[atributos.length - 1];
        const finalStructDef = this.getStruct(StructTipo);
        if (!finalStructDef) {
            throw new Error(`Definición De Struct No Encontrada Para: "${StructTipo}".`);
        }
        const finalAtributo = finalStructDef.atributos.find(attr => attr.id === UltimoAtributo);
        if (!finalAtributo) {
            throw new Error(`El atributo "${UltimoAtributo}" no está definido en la Struct "${StructTipo}".`);
        }
        if (finalAtributo.tipo === "string" && valor.tipo !== "string") {
            throw new Error(`El tipo del atributo "${UltimoAtributo}" es "string". No coincide con el tipo del valor asignado.`);
        }
        if (finalAtributo.tipo === "int" && valor.tipo !== "int") {
            throw new Error(`El tipo del atributo "${UltimoAtributo}" es "int". No coincide con el tipo del valor asignado.`);
        }
        if (finalAtributo.tipo === "float" && valor.tipo === "int") {
            valor.valor = parseFloat(valor.valor);
            valor.tipo = 'float';
        }
        if (finalAtributo.tipo === "float" && valor.tipo !== "float") {
            throw new Error(`El tipo del atributo "${UltimoAtributo}" es "float". No coincide con el tipo del valor asignado.`);
        }
        if (finalAtributo.tipo === "char" && valor.tipo !== "char") {
            throw new Error(`El tipo del atributo "${UltimoAtributo}" es "char". No coincide con el tipo del valor asignado.`);
        }
        if (finalAtributo.tipo === "boolean" && valor.tipo !== "boolean") {
            throw new Error(`El tipo del atributo "${UltimoAtributo}" es "boolean". No coincide con el tipo del valor asignado.`);
        }
        StructPadre[UltimoAtributo] = valor;
    }

    LimpiarTabla () {
        Simbolos = [];
    }
    
    RetornarEntorno() {
        SimbolosConvertidos = [];
        const convertirStructAString = (struct) => {
            let resultado = '';
            for (const key in struct) {
                const prop = struct[key];
                if (typeof prop.valor === 'object' && prop.valor !== null && !Array.isArray(prop.valor)) {
                    resultado += `${key}: {\n${convertirStructAString(prop.valor)}\n}, `;
                } else {
                    resultado += `${key}: ${prop.valor}, `;
                }
            }
            resultado = resultado.slice(0, -2);
            return resultado;
        };

        for (let i = 0; i < Simbolos.length; i++) {
            const simbolo = Simbolos[i];
            if (simbolo.valor instanceof Foranea) {
                SimbolosConvertidos.push({
                    tipo: simbolo.tipo,
                    simbolo: "Función",
                    nombre: simbolo.nombre,
                    valor: "Función Foránea",
                    fila: simbolo.fila||'N/A',
                    columna: simbolo.columna||'N/A'
                });
            } else if (this.getStruct(simbolo.tipo)) {
                const structString = convertirStructAString(simbolo.valor.valor);
                SimbolosConvertidos.push({
                    tipo: simbolo.tipo,
                    simbolo: "Struct",
                    nombre: simbolo.nombre,
                    valor: structString,
                    fila: simbolo.fila||'N/A',
                    columna: simbolo.columna||'N/A'
                });
            } else if (Array.isArray(simbolo.valor.valor)) {
                SimbolosConvertidos.push({
                    tipo: simbolo.tipo,
                    simbolo: "Array",
                    nombre: simbolo.nombre,
                    valor: simbolo.valor.valor,
                    fila: simbolo.fila||'N/A',
                    columna: simbolo.columna||'N/A'
                });
            }
            else if (simbolo.tipo !== "funcion") {
                SimbolosConvertidos.push({
                    tipo: simbolo.tipo,
                    simbolo: "Variable",
                    nombre: simbolo.nombre,
                    valor: simbolo.valor.valor,
                    fila: simbolo.fila||'N/A',
                    columna: simbolo.columna||'N/A'
                }
                );
            }
        }
        return SimbolosConvertidos;
    }
    
}
