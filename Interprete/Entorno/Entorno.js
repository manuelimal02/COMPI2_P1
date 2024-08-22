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
            if (typeof valor !== variable.tipo) {
                throw new Error(`Tipo incorrecto. Se esperaba ${variable.tipo} para la variable ${nombre}`);
            }
            this.valores[nombre].valor = valor;
            return;
        }

        if (!variable && this.padre) {
            this.padre.assignVariable(nombre, valor);
            return;
        }

        throw new Error(`Variable ${nombre} no definida`);
    }
}
