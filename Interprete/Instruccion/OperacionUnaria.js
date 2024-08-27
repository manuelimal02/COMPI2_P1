export class OperacionUnariaHandler {
    /**
     * @param {string} operador
     * @param {any} izquierda
     */

    constructor(operador, izquierda) {
        this.operador = operador;
        this.izquierda = izquierda;
    }

    EjecutarHandler() {
        switch (this.operador) {
            case '-':
                if (this.izquierda.tipo === 'int' || this.izquierda.tipo === 'float') {
                    return { valor: -this.izquierda.valor, tipo: this.izquierda.tipo };
                } else {
                    throw new Error(`Error: Operación - No Permitida El Tipo: "${this.izquierda.tipo}".`);
                }
            case '++':
                if (this.izquierda.tipo === 'int') {
                    return { valor: this.izquierda.valor + 1, tipo: 'int' };
                } else if (this.izquierda.tipo === 'float') {
                    return { valor: this.izquierda.valor + 1, tipo: 'float' };
                } else {
                    throw new Error(`Error: Operación ++ No Permitida El Tipo: "${this.izquierda.tipo}".`);
                }
            case '--':
                if (this.izquierda.tipo === 'int') {
                    return { valor: this.izquierda.valor - 1, tipo: 'int' };
                } else if (this.izquierda.tipo === 'float') {
                    return { valor: this.izquierda.valor - 1, tipo: 'float' };
                } else {
                    throw new Error(`Error: Operación -- No Permitida El Tipo: "${this.izquierda.tipo}".`);
                }
            case '!':
                if (this.izquierda.tipo === 'boolean') {
                    return { valor: !this.izquierda.valor, tipo: 'boolean' };
                } else {
                    throw new Error(`Error: Operación ! No Permitida El Tipo: "${this.izquierda.tipo}".`);
                }
            default:
                throw new Error(`Operador No Reconocido: ${this.operador}`);
        }
    }
}