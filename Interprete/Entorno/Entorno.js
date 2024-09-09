import { Foranea } from "../Instruccion/Foranea.js";
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
     */
    setVariable(tipo, nombre, valor) {
        if (this.valores[nombre]) {
            throw new Error(`La Variable: "${nombre}" Ya Está Definida.`);
        }
        this.valores[nombre] = { valor, tipo};
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
     */
    assignVariable(nombre, valor) {
        const variable = this.valores[nombre]
        if (variable != undefined) {
            if (variable.tipo === "string" && valor.tipo !== "string") {
                throw new Error(`El Tipo De La variable "${nombre}" Es "string". No Coincide Con El Tipo Del Valor Asignado.`);
            }
            if (variable.tipo === "int" && valor.tipo !== "int") {
                throw new Error(`El Tipo De La variable "${nombre}" Es "int". No Coincide Con El Tipo Del Valor Asignado.`);
            }
            if (variable.tipo === "float" && valor.tipo === "int") {
                valor.valor = parseFloat(valor.valor);
                valor.tipo = 'float';
            }
            if (variable.tipo === "float" && valor.tipo !== "float") {
                throw new Error(`El Tipo De La variable "${nombre}" Es "float". No Coincide Con El Tipo Del Valor Asignado.`);
            }
            if (variable.tipo === "char" && valor.tipo !== "char") {
                throw new Error(`El Tipo De La variable "${nombre}" Es "char". No Coincide Con El Tipo Del Valor Asignado.`);
            }
            if (variable.tipo === "boolean" && valor.tipo !== "boolean") {
                throw new Error(`El Tipo De La variable "${nombre}" Es "boolean". No Coincide Con El Tipo Del Valor Asignado.`);
            }
            this.valores[nombre].valor = {valor: valor.valor, tipo: valor.tipo};
            this.valores[nombre].tipo = valor.tipo; 
            return;
        }
        if (!variable && this.padre) {
            this.padre.assignVariable(nombre, valor);
            return;
        }
        throw new Error(`La Variable "${nombre}" No Está Definida.`);
    }

    //Manejo De Temporales Para ForEach
    /**
     * @param {string} nombre
     */
    setTemporal(tipo, nombre, valor) {
        if(this.valores[nombre]) {
            throw new Error(`La Variable: "${nombre}" Ya Está Definida.`);
        }
        this.valores[nombre] = {valor, tipo}
    }

    //Manejo De Structs
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

    RetornarEntorno() {
        let Simbolos = [];
        const agregarSimbolos = (entorno) => {
            for (const key in entorno.valores) {
                if (Object.hasOwnProperty.call(entorno.valores, key)) {
                    const element = entorno.valores[key];
                    if (element.tipo === "funcion") {
                        Simbolos.push({ nombre: key, tipo: element.tipo, valor: "Función Nativa" });
                    } else if (element.valor instanceof Foranea) {
                        Simbolos.push({ nombre: key, tipo: element.tipo, valor: "Función Foránea" });
                    } else {
                        Simbolos.push({ nombre: key, tipo: element.tipo, valor: element.valor.valor });
                    }
                }
            }
        };
        agregarSimbolos(this);
        let entornoPadre = this.padre;
        while (entornoPadre) {
            agregarSimbolos(entornoPadre);
        }
        return Simbolos;
    }
    
}
