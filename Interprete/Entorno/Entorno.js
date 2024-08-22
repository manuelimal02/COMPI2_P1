export class Entorno {
    /**
     * @param {Entorno} padre
     */
    constructor(padre = undefined) {
        this.valores = {};
        this.padre = padre;
    }

    /**
     * @param {string} tipo
     * @param {string} nombre
     * @param {any} valor
     */
    setVariable(tipo, nombre, valor) {
        if (this.valores[nombre]) {
            throw new Error(`La variable ${nombre} ya está definida`);
        }
        this.valores[nombre] = { tipo, valor };
    }

    /**
     * @param {string} nombre
     */
    getVariable(nombre) {
        const variable = this.valores[nombre];

        if (variable) return variable.valor;

        if (!variable && this.padre) {
            return this.padre.getVariable(nombre);
        }

        throw new Error(`Variable ${nombre} no definida`);
    }

    /**
     * @param {string} nombre
     * @param {any} valor
     */
    assignVariable(nombre, valor) {
        const variable = this.valores[nombre];
        if (variable) {
            if (
                (variable.tipo === 'int' && typeof valor !== 'number') ||
                (variable.tipo === 'float' && typeof valor !== 'number') ||
                (variable.tipo === 'string' && typeof valor !== 'string') ||
                (variable.tipo === 'char' && (typeof valor !== 'string' || valor.length !== 1)) ||
                (variable.tipo === 'bool' && typeof valor !== 'boolean')
            ) 
            {
                throw new Error(`Tipo incorrecto. Se Esperaba: "${variable.tipo}" Para La Variable: "${nombre}"`);
            }
            this.valores[nombre].valor = valor;
            return;
        }
        if (!variable && this.padre) {
            this.padre.assignVariable(nombre, valor);
            return;
        }
        throw new Error(`La Variable: "${nombre}" No Está Definida.`);
    }
    
}
